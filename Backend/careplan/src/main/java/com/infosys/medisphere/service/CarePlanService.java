package com.infosys.medisphere.service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.infosys.medisphere.dto.CarePlanDto;
import com.infosys.medisphere.dto.CarePlanModifyRequest;
import com.infosys.medisphere.dto.OutcomeUpdateRequest;
import com.infosys.medisphere.dto.PredictionDto;
import com.infosys.medisphere.dto.UpdateProgressRequest;
import com.infosys.medisphere.model.CarePlan;
import com.infosys.medisphere.repository.CarePlanRepository;
@Service
public class CarePlanService {
	@Autowired
	private CarePlanRepository carePlanRepository;
	@Autowired
	private RestTemplate restTemplate;
	@Autowired
	private OllamaService ollamaService;
	  public CarePlanDto generateCarePlan(Long patientId) {

	        // Prediction Service URL
	        String url =
	                "http://localhost:8089/predict/patient/" + patientId;


	        // Get prediction history
	        PredictionDto[] predictions =
	                restTemplate.getForObject(
	                        url,
	                        PredictionDto[].class
	                );


	        // Check if prediction exists
	        if (predictions == null || predictions.length == 0) {

	            throw new RuntimeException(
	                    "No prediction found for patient: " + patientId
	            );
	        }


	        // Get latest prediction
	        PredictionDto prediction =
	                predictions[predictions.length - 1];
	        


	        // Create CarePlan
	        CarePlan carePlan = new CarePlan();


	        // Patient information
	        carePlan.setPatientId(
	                String.valueOf(patientId)
	        );


	        // Prediction information
	        carePlan.setPredictionType(
	                prediction.getPredictionType()
	        );

	        carePlan.setPrediction(
	                prediction.getPrediction()
	        );

	        carePlan.setPredictionRisk(
	                prediction.getProbability() * 100
	        );

	        carePlan.setRiskLevel(
	                prediction.getRiskLevel()
	        );

	        carePlan.setRecommendation(
	                prediction.getRecommendation()
	        );


	        // Generate recommendations
	        generateRecommendations(
	                carePlan,
	                prediction
	        );


	        // Initial values
	        carePlan.setDoctorStatus("Pending");

	        carePlan.setAdherence(0);

	        carePlan.setNextReview(
	                LocalDate.now().plusDays(30)
	        );

	        carePlan.setCreatedDate(
	                LocalDate.now()
	        );

	        carePlan.setUpdatedDate(
	                LocalDate.now()
	        );


	        // Save to MongoDB
	        CarePlan savedCarePlan =
	                carePlanRepository.save(carePlan);


	        return convertToDTO(savedCarePlan);
	    }


	    // =====================================================
	    // GENERATE RECOMMENDATIONS
	    // =====================================================

	  private void generateRecommendations(
		        CarePlan carePlan,
		        PredictionDto prediction) {

		    String prompt = """
		            You are a healthcare care-plan assistant.

		            Generate a simple personalized care plan based on the
		            patient's prediction information.

		            Prediction Type: %s
		            Prediction: %s
		            Risk Level: %s
		            Risk Probability: %.2f%%

		            Return the response in exactly this format:

		            GOAL:
		            ...

		            MEDICATIONS:
		            ...

		            DIET:
		            ...

		            EXERCISE:
		            ...

		            SLEEP:
		            ...

		            RECOMMENDATION:
		            ...

		            Important:
		            - Do not prescribe specific medicines.
		            - Say medications should be taken only as prescribed by a doctor.
		            - Give practical lifestyle recommendations.
		            - Keep the response concise.
		            """.formatted(
		                    prediction.getPredictionType(),
		                    prediction.getPrediction(),
		                    prediction.getRiskLevel(),
		                    prediction.getProbability() * 100
		            );

		    String aiResponse =
		            ollamaService.generateCarePlan(prompt);

		    parseAIResponse(carePlan, aiResponse);
		}
	  private void parseAIResponse(
		        CarePlan carePlan,
		        String response) {

		    String[] sections = response.split("\\n\\n");

		    for (String section : sections) {

		        String text = section.trim();

		        if (text.startsWith("GOAL:")) {

		            carePlan.setGoal(
		                    text.substring("GOAL:".length()).trim()
		            );

		        } else if (text.startsWith("MEDICATIONS:")) {

		            String medications =
		                    text.substring("MEDICATIONS:".length()).trim();

		            carePlan.setMedications(
		                    Arrays.asList(
		                            medications.split("\\n")
		                    )
		            );

		        } else if (text.startsWith("DIET:")) {

		            carePlan.setDiet(
		                    text.substring("DIET:".length()).trim()
		            );

		        } else if (text.startsWith("EXERCISE:")) {

		            carePlan.setExercise(
		                    text.substring("EXERCISE:".length()).trim()
		            );

		        } else if (text.startsWith("SLEEP:")) {

		            carePlan.setSleep(
		                    text.substring("SLEEP:".length()).trim()
		            );

		        } else if (text.startsWith("RECOMMENDATION:")) {

		            String recommendation =
		                    text.replaceFirst("RECOMMENDATION:", "").trim();

		            carePlan.setRecommendation(recommendation);
		        }
		    }
		}

	    // =====================================================
	    // GET CURRENT CARE PLAN
	    // =====================================================

	    public CarePlanDto getCarePlan(
	            String patientId) {


	        CarePlan carePlan =
	                carePlanRepository
	                        .findByPatientId(patientId)
	                        .orElseThrow(() ->
	                                new RuntimeException(
	                                        "Care Plan not found for patient: "
	                                                + patientId
	                                )
	                        );


	        return convertToDTO(carePlan);
	    }


	    // =====================================================
	    // GET CARE PLAN HISTORY
	    // =====================================================

	    public List<CarePlanDto> getCarePlanHistory(
	            String patientId) {


	        List<CarePlan> carePlans =
	                carePlanRepository
	                        .findAllByPatientId(patientId);


	        return carePlans.stream()
	                .map(this::convertToDTO)
	                .toList();
	    }


	    // =====================================================
	    // MODEL → DTO
	    // =====================================================

	    private CarePlanDto convertToDTO(
	            CarePlan carePlan) {


	        CarePlanDto dto =
	                new CarePlanDto();


	        dto.setId(
	                carePlan.getId()
	        );

	        dto.setPatientId(
	                carePlan.getPatientId()
	        );

	        dto.setPredictionType(
	                carePlan.getPredictionType()
	        );

	        dto.setPredictionRisk(
	                carePlan.getPredictionRisk()
	        );

	        dto.setRiskLevel(
	                carePlan.getRiskLevel()
	        );

	        dto.setPrediction(
	                carePlan.getPrediction()
	        );

	        dto.setRecommendation(
	                carePlan.getRecommendation()
	        );

	        dto.setGoal(
	                carePlan.getGoal()
	        );

	        dto.setMedications(
	                carePlan.getMedications()
	        );

	        dto.setDiet(
	                carePlan.getDiet()
	        );

	        dto.setExercise(
	                carePlan.getExercise()
	        );

	        dto.setSleep(
	                carePlan.getSleep()
	        );

	        dto.setDoctorNotes(
	                carePlan.getDoctorNotes()
	        );

	        dto.setDoctorStatus(
	                carePlan.getDoctorStatus()
	        );

	        dto.setAdherence(
	                carePlan.getAdherence()
	        );
	        dto.setMedicineTaken(
	                carePlan.isMedicineTaken()
	        );

	        dto.setExerciseDone(
	                carePlan.isExerciseDone()
	        );

	        dto.setBpChecked(
	                carePlan.isBpChecked()
	        );

	        dto.setSugarChecked(
	                carePlan.isSugarChecked()
	        );
	        dto.setPreviousRisk(
	                carePlan.getPreviousRisk()
	        );

	        dto.setCurrentRisk(
	                carePlan.getCurrentRisk()
	        );

	        dto.setPreviousWeight(
	                carePlan.getPreviousWeight()
	        );

	        dto.setCurrentWeight(
	                carePlan.getCurrentWeight()
	        );

	        dto.setPreviousBp(
	                carePlan.getPreviousBp()
	        );

	        dto.setCurrentBp(
	                carePlan.getCurrentBp()
	        );

	        dto.setPreviousSugar(
	                carePlan.getPreviousSugar()
	        );

	        dto.setCurrentSugar(
	                carePlan.getCurrentSugar()
	        );

	        dto.setNextReview(
	                carePlan.getNextReview()
	        );
	        dto.setAdherence(carePlan.getAdherence());

	        dto.setMedicineTaken(carePlan.isMedicineTaken());

	        dto.setExerciseDone(carePlan.isExerciseDone());

	        dto.setBpChecked(carePlan.isBpChecked());

	        dto.setSugarChecked(carePlan.isSugarChecked());


	        return dto;
	    }
	    public CarePlanDto approveCarePlan(
	            String carePlanId,
	            String doctorNotes) {

	        CarePlan carePlan =
	                carePlanRepository.findById(carePlanId)
	                        .orElseThrow(() ->
	                                new RuntimeException(
	                                        "Care Plan not found: "
	                                                + carePlanId
	                                )
	                        );

	        // Change status
	        carePlan.setDoctorStatus("Approved");

	        // Save doctor's notes
	        carePlan.setDoctorNotes(doctorNotes);

	        // Update date
	        carePlan.setUpdatedDate(LocalDate.now());

	        // Save changes
	        CarePlan updatedCarePlan =
	                carePlanRepository.save(carePlan);

	        return convertToDTO(updatedCarePlan);
	    }
	    public CarePlanDto updateProgress(UpdateProgressRequest request) {

	        // Find CarePlan
	        CarePlan carePlan = carePlanRepository
	                .findById(request.getCarePlanId())
	                .orElseThrow(() ->
	                        new RuntimeException(
	                                "Care Plan not found: "
	                                        + request.getCarePlanId()
	                        )
	                );

	        // Update activities
	        carePlan.setMedicineTaken(
	                request.isMedicineTaken()
	        );

	        carePlan.setExerciseDone(
	                request.isExerciseDone()
	        );

	        carePlan.setBpChecked(
	                request.isBpChecked()
	        );

	        carePlan.setSugarChecked(
	                request.isSugarChecked()
	        );

	        // Calculate adherence
	        int completedActivities = 0;

	        if (carePlan.isMedicineTaken()) {
	            completedActivities++;
	        }

	        if (carePlan.isExerciseDone()) {
	            completedActivities++;
	        }

	        if (carePlan.isBpChecked()) {
	            completedActivities++;
	        }

	        if (carePlan.isSugarChecked()) {
	            completedActivities++;
	        }

	        int totalActivities = 4;

	        int adherence =
	                (completedActivities * 100) / totalActivities;

	        carePlan.setAdherence(adherence);

	        // Update date
	        carePlan.setUpdatedDate(LocalDate.now());

	        // Save
	        CarePlan updatedCarePlan =
	                carePlanRepository.save(carePlan);

	        // Return DTO
	        return convertToDTO(updatedCarePlan);
	    }
	    public CarePlanDto modifyCarePlan(
	            CarePlanModifyRequest request) {

	        CarePlan carePlan =
	                carePlanRepository
	                        .findById(request.getCarePlanId())
	                        .orElseThrow(() ->
	                                new RuntimeException(
	                                        "Care Plan not found"
	                                )
	                        );

	        // Update doctor modifications

	        carePlan.setGoal(
	                request.getGoal()
	        );

	        carePlan.setMedications(
	                request.getMedications()
	        );

	        carePlan.setDiet(
	                request.getDiet()
	        );

	        carePlan.setExercise(
	                request.getExercise()
	        );

	        carePlan.setSleep(
	                request.getSleep()
	        );

	        carePlan.setDoctorNotes(
	                request.getDoctorNotes()
	        );

	        // Keep it pending after modification
	        // Doctor can review the modified plan again

	        carePlan.setDoctorStatus(
	                "Pending"
	        );

	        carePlan.setUpdatedDate(
	                LocalDate.now()
	        );

	        CarePlan updatedCarePlan =
	                carePlanRepository.save(carePlan);

	        return convertToDTO(updatedCarePlan);
	    }
	    public CarePlanDto updateOutcome(
	            OutcomeUpdateRequest request) {

	        // 1. Find existing Care Plan
	        CarePlan carePlan =
	                carePlanRepository
	                        .findById(request.getCarePlanId())
	                        .orElseThrow(() ->
	                                new RuntimeException(
	                                        "Care Plan not found: "
	                                                + request.getCarePlanId()
	                                )
	                        );

	        // 2. Move current values to previous values
	        carePlan.setPreviousRisk(
	                carePlan.getCurrentRisk() != null
	                        ? carePlan.getCurrentRisk()
	                        : carePlan.getPredictionRisk()
	        );

	        carePlan.setPreviousWeight(
	                carePlan.getCurrentWeight()
	        );

	        carePlan.setPreviousBp(
	                carePlan.getCurrentBp()
	        );

	        carePlan.setPreviousSugar(
	                carePlan.getCurrentSugar()
	        );

	        // 3. Store new/current values
	        carePlan.setCurrentRisk(
	                request.getCurrentRisk()
	        );

	        carePlan.setCurrentWeight(
	                request.getCurrentWeight()
	        );

	        carePlan.setCurrentBp(
	                request.getCurrentBp()
	        );

	        carePlan.setCurrentSugar(
	                request.getCurrentSugar()
	        );

	        // 4. Update date
	        carePlan.setUpdatedDate(
	                LocalDate.now()
	        );

	        // 5. Save to MongoDB
	        CarePlan updatedCarePlan =
	                carePlanRepository.save(carePlan);

	        // 6. Convert Model → DTO
	        return convertToDTO(updatedCarePlan);
	    }
	    public long getCarePlanCount() {
	        return carePlanRepository.count();
	    }
	    public List<CarePlan> getAllCarePlans() {
	        return carePlanRepository.findAll();
	    }


}



//package com.infosys.medisphere.service;
//
//import java.time.LocalDate;
//import java.util.Arrays;
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//
//import com.infosys.medisphere.dto.CarePlanDto;
//import com.infosys.medisphere.dto.CarePlanModifyRequest;
//import com.infosys.medisphere.dto.HealthTwinDto;
//import com.infosys.medisphere.dto.OutcomeUpdateRequest;
//import com.infosys.medisphere.dto.PredictionDto;
//import com.infosys.medisphere.dto.UpdateProgressRequest;
//import com.infosys.medisphere.model.CarePlan;
//import com.infosys.medisphere.repository.CarePlanRepository;
//
//@Service
//public class CarePlanService {
//
//    @Autowired
//    private CarePlanRepository carePlanRepository;
//
//    @Autowired
//    private RestTemplate restTemplate;
//
//    @Autowired
//    private OllamaService ollamaService;
//
//
//    // =====================================================
//    // GENERATE CARE PLAN
//    // =====================================================
//
//    public CarePlanDto generateCarePlan(Long patientId) {
//
//        // -------------------------------------------------
//        // 1. Get Prediction from Prediction Service
//        // -------------------------------------------------
//
//        String url =
//                "http://localhost:8089/predict/patient/" + patientId;
//
//        PredictionDto[] predictions =
//                restTemplate.getForObject(
//                        url,
//                        PredictionDto[].class
//                );
//
//        if (predictions == null || predictions.length == 0) {
//
//            throw new RuntimeException(
//                    "No prediction found for patient: " + patientId
//            );
//        }
//
//        // Get latest prediction
//        PredictionDto prediction =
//                predictions[predictions.length - 1];
//
//
//        // -------------------------------------------------
//        // 2. Get HealthTwin from HealthTwin Service
//        // -------------------------------------------------
//
//        HealthTwinDto healthTwin =
//                restTemplate.getForObject(
//                        "http://localhost:8082/healthtwin/" + patientId,
//                        HealthTwinDto.class
//                );
//
//        if (healthTwin == null) {
//
//            throw new RuntimeException(
//                    "Health Twin not found for patient: " + patientId
//            );
//        }
//
//
//        // -------------------------------------------------
//        // 3. Create CarePlan
//        // -------------------------------------------------
//
//        CarePlan carePlan = new CarePlan();
//
//        carePlan.setPatientId(
//                String.valueOf(patientId)
//        );
//
//
//        // -------------------------------------------------
//        // 4. Prediction information
//        // -------------------------------------------------
//
//        carePlan.setPredictionType(
//                prediction.getPredictionType()
//        );
//
//        carePlan.setPrediction(
//                prediction.getPrediction()
//        );
//
//        carePlan.setPredictionRisk(
//                prediction.getProbability() * 100
//        );
//
//        carePlan.setRiskLevel(
//                prediction.getRiskLevel()
//        );
//
//        carePlan.setRecommendation(
//                prediction.getRecommendation()
//        );
//
//
//        // -------------------------------------------------
//        // 5. Generate AI Recommendations
//        // -------------------------------------------------
//
//        generateRecommendations(
//                carePlan,
//                prediction,
//                healthTwin
//        );
//
//
//        // -------------------------------------------------
//        // 6. Initial values
//        // -------------------------------------------------
//
//        carePlan.setDoctorStatus("Pending");
//
//        carePlan.setAdherence(0);
//
//        carePlan.setNextReview(
//                LocalDate.now().plusDays(30)
//        );
//
//        carePlan.setCreatedDate(
//                LocalDate.now()
//        );
//
//        carePlan.setUpdatedDate(
//                LocalDate.now()
//        );
//
//
//        // -------------------------------------------------
//        // 7. Save CarePlan
//        // -------------------------------------------------
//
//        CarePlan savedCarePlan =
//                carePlanRepository.save(carePlan);
//
//        return convertToDTO(savedCarePlan);
//    }
//
//
//    // =====================================================
//    // GENERATE AI RECOMMENDATIONS
//    // =====================================================
//
//    private void generateRecommendations(
//            CarePlan carePlan,
//            PredictionDto prediction,
//            HealthTwinDto healthTwin) {
//
//
//        // -------------------------------------------------
//        // Only these HealthTwin values are used:
//        //
//        // Weight
//        // Blood Sugar
//        // Blood Pressure
//        // -------------------------------------------------
//
//        String prompt = """
//                You are a healthcare care-plan assistant.
//
//                Generate a simple personalized care plan based on
//                the patient's current health data and prediction information.
//
//                CURRENT HEALTH DATA:
//
//                Weight: %s kg
//                Blood Sugar: %s mg/dL
//                Blood Pressure: %s/%s mmHg
//
//                PREDICTION INFORMATION:
//
//                Prediction Type: %s
//                Prediction: %s
//                Risk Level: %s
//                Risk Probability: %.2f%%
//
//                Return the response in exactly this format:
//
//                GOAL:
//                ...
//
//                MEDICATIONS:
//                ...
//
//                DIET:
//                ...
//
//                EXERCISE:
//                ...
//
//                SLEEP:
//                ...
//
//                RECOMMENDATION:
//                ...
//
//                Important:
//                - Do not prescribe specific medicines.
//                - Say medications should be taken only as prescribed by a doctor.
//                - Give practical lifestyle recommendations.
//                - Consider the patient's weight, blood sugar and blood pressure.
//                - Consider the prediction and risk level.
//                - Keep the response concise.
//                """.formatted(
//
//                        // HealthTwin values
//                        healthTwin.getWeight(),
//                        healthTwin.getBloodSugar(),
//                        healthTwin.getSystolicBP(),
//                        healthTwin.getDiastolicBP(),
//
//                        // Prediction values
//                        prediction.getPredictionType(),
//                        prediction.getPrediction(),
//                        prediction.getRiskLevel(),
//                        prediction.getProbability() * 100
//                );
//
//
//        // -------------------------------------------------
//        // Send prompt to Ollama
//        // -------------------------------------------------
//
//        String aiResponse =
//                ollamaService.generateCarePlan(prompt);
//
//
//        // -------------------------------------------------
//        // Parse AI response
//        // -------------------------------------------------
//
//        parseAIResponse(
//                carePlan,
//                aiResponse
//        );
//    }
//
//
//    // =====================================================
//    // PARSE AI RESPONSE
//    // =====================================================
//
//    private void parseAIResponse(
//            CarePlan carePlan,
//            String response) {
//
//        String[] sections =
//                response.split("\\n\\n");
//
//        for (String section : sections) {
//
//            String text =
//                    section.trim();
//
//
//            if (text.startsWith("GOAL:")) {
//
//                carePlan.setGoal(
//                        text.substring(
//                                "GOAL:".length()
//                        ).trim()
//                );
//
//
//            } else if (text.startsWith("MEDICATIONS:")) {
//
//                String medications =
//                        text.substring(
//                                "MEDICATIONS:".length()
//                        ).trim();
//
//                carePlan.setMedications(
//                        Arrays.asList(
//                                medications.split("\\n")
//                        )
//                );
//
//
//            } else if (text.startsWith("DIET:")) {
//
//                carePlan.setDiet(
//                        text.substring(
//                                "DIET:".length()
//                        ).trim()
//                );
//
//
//            } else if (text.startsWith("EXERCISE:")) {
//
//                carePlan.setExercise(
//                        text.substring(
//                                "EXERCISE:".length()
//                        ).trim()
//                );
//
//
//            } else if (text.startsWith("SLEEP:")) {
//
//                carePlan.setSleep(
//                        text.substring(
//                                "SLEEP:".length()
//                        ).trim()
//                );
//
//
//            } else if (text.startsWith("RECOMMENDATION:")) {
//
//                String recommendation =
//                        text.replaceFirst(
//                                "RECOMMENDATION:",
//                                ""
//                        ).trim();
//
//                carePlan.setRecommendation(
//                        recommendation
//                );
//            }
//        }
//    }
//
//
//    // =====================================================
//    // GET CURRENT CARE PLAN
//    // =====================================================
//
//    public CarePlanDto getCarePlan(
//            String patientId) {
//
//        CarePlan carePlan =
//                carePlanRepository
//                        .findByPatientId(patientId)
//                        .orElseThrow(() ->
//                                new RuntimeException(
//                                        "Care Plan not found for patient: "
//                                                + patientId
//                                )
//                        );
//
//        return convertToDTO(carePlan);
//    }
//
//
//    // =====================================================
//    // GET CARE PLAN HISTORY
//    // =====================================================
//
//    public List<CarePlanDto> getCarePlanHistory(
//            String patientId) {
//
//        List<CarePlan> carePlans =
//                carePlanRepository
//                        .findAllByPatientId(patientId);
//
//        return carePlans.stream()
//                .map(this::convertToDTO)
//                .toList();
//    }
//
//
//    // =====================================================
//    // MODEL → DTO
//    // =====================================================
//
//    private CarePlanDto convertToDTO(
//            CarePlan carePlan) {
//
//        CarePlanDto dto =
//                new CarePlanDto();
//
//        dto.setId(
//                carePlan.getId()
//        );
//
//        dto.setPatientId(
//                carePlan.getPatientId()
//        );
//
//        dto.setPredictionType(
//                carePlan.getPredictionType()
//        );
//
//        dto.setPredictionRisk(
//                carePlan.getPredictionRisk()
//        );
//
//        dto.setRiskLevel(
//                carePlan.getRiskLevel()
//        );
//
//        dto.setPrediction(
//                carePlan.getPrediction()
//        );
//
//        dto.setRecommendation(
//                carePlan.getRecommendation()
//        );
//
//        dto.setGoal(
//                carePlan.getGoal()
//        );
//
//        dto.setMedications(
//                carePlan.getMedications()
//        );
//
//        dto.setDiet(
//                carePlan.getDiet()
//        );
//
//        dto.setExercise(
//                carePlan.getExercise()
//        );
//
//        dto.setSleep(
//                carePlan.getSleep()
//        );
//
//        dto.setDoctorNotes(
//                carePlan.getDoctorNotes()
//        );
//
//        dto.setDoctorStatus(
//                carePlan.getDoctorStatus()
//        );
//
//        dto.setAdherence(
//                carePlan.getAdherence()
//        );
//
//        dto.setMedicineTaken(
//                carePlan.isMedicineTaken()
//        );
//
//        dto.setExerciseDone(
//                carePlan.isExerciseDone()
//        );
//
//        dto.setBpChecked(
//                carePlan.isBpChecked()
//        );
//
//        dto.setSugarChecked(
//                carePlan.isSugarChecked()
//        );
//
//        dto.setPreviousRisk(
//                carePlan.getPreviousRisk()
//        );
//
//        dto.setCurrentRisk(
//                carePlan.getCurrentRisk()
//        );
//
//        dto.setPreviousWeight(
//                carePlan.getPreviousWeight()
//        );
//
//        dto.setCurrentWeight(
//                carePlan.getCurrentWeight()
//        );
//
//        dto.setPreviousBp(
//                carePlan.getPreviousBp()
//        );
//
//        dto.setCurrentBp(
//                carePlan.getCurrentBp()
//        );
//
//        dto.setPreviousSugar(
//                carePlan.getPreviousSugar()
//        );
//
//        dto.setCurrentSugar(
//                carePlan.getCurrentSugar()
//        );
//
//        dto.setNextReview(
//                carePlan.getNextReview()
//        );
//
//        return dto;
//    }
//
//
//    // =====================================================
//    // APPROVE CARE PLAN
//    // =====================================================
//
//    public CarePlanDto approveCarePlan(
//            String carePlanId,
//            String doctorNotes) {
//
//        CarePlan carePlan =
//                carePlanRepository.findById(carePlanId)
//                        .orElseThrow(() ->
//                                new RuntimeException(
//                                        "Care Plan not found: "
//                                                + carePlanId
//                                )
//                        );
//
//        carePlan.setDoctorStatus(
//                "Approved"
//        );
//
//        carePlan.setDoctorNotes(
//                doctorNotes
//        );
//
//        carePlan.setUpdatedDate(
//                LocalDate.now()
//        );
//
//        CarePlan updatedCarePlan =
//                carePlanRepository.save(
//                        carePlan
//                );
//
//        return convertToDTO(
//                updatedCarePlan
//        );
//    }
//
//
//    // =====================================================
//    // UPDATE PROGRESS
//    // =====================================================
//
//    public CarePlanDto updateProgress(
//            UpdateProgressRequest request) {
//
//        CarePlan carePlan =
//                carePlanRepository
//                        .findById(
//                                request.getCarePlanId()
//                        )
//                        .orElseThrow(() ->
//                                new RuntimeException(
//                                        "Care Plan not found: "
//                                                + request.getCarePlanId()
//                                )
//                        );
//
//        carePlan.setMedicineTaken(
//                request.isMedicineTaken()
//        );
//
//        carePlan.setExerciseDone(
//                request.isExerciseDone()
//        );
//
//        carePlan.setBpChecked(
//                request.isBpChecked()
//        );
//
//        carePlan.setSugarChecked(
//                request.isSugarChecked()
//        );
//
//
//        // Calculate adherence
//
//        int completedActivities = 0;
//
//        if (carePlan.isMedicineTaken()) {
//            completedActivities++;
//        }
//
//        if (carePlan.isExerciseDone()) {
//            completedActivities++;
//        }
//
//        if (carePlan.isBpChecked()) {
//            completedActivities++;
//        }
//
//        if (carePlan.isSugarChecked()) {
//            completedActivities++;
//        }
//
//        int totalActivities = 4;
//
//        int adherence =
//                (completedActivities * 100)
//                        / totalActivities;
//
//        carePlan.setAdherence(
//                adherence
//        );
//
//        carePlan.setUpdatedDate(
//                LocalDate.now()
//        );
//
//        CarePlan updatedCarePlan =
//                carePlanRepository.save(
//                        carePlan
//                );
//
//        return convertToDTO(
//                updatedCarePlan
//        );
//    }
//
//
//    // =====================================================
//    // MODIFY CARE PLAN
//    // =====================================================
//
//    public CarePlanDto modifyCarePlan(
//            CarePlanModifyRequest request) {
//
//        CarePlan carePlan =
//                carePlanRepository
//                        .findById(
//                                request.getCarePlanId()
//                        )
//                        .orElseThrow(() ->
//                                new RuntimeException(
//                                        "Care Plan not found"
//                                )
//                        );
//
//        carePlan.setGoal(
//                request.getGoal()
//        );
//
//        carePlan.setMedications(
//                request.getMedications()
//        );
//
//        carePlan.setDiet(
//                request.getDiet()
//        );
//
//        carePlan.setExercise(
//                request.getExercise()
//        );
//
//        carePlan.setSleep(
//                request.getSleep()
//        );
//
//        carePlan.setDoctorNotes(
//                request.getDoctorNotes()
//        );
//
//        carePlan.setDoctorStatus(
//                "Pending"
//        );
//
//        carePlan.setUpdatedDate(
//                LocalDate.now()
//        );
//
//        CarePlan updatedCarePlan =
//                carePlanRepository.save(
//                        carePlan
//                );
//
//        return convertToDTO(
//                updatedCarePlan
//        );
//    }
//
//
//    // =====================================================
//    // UPDATE OUTCOME
//    // =====================================================
//
//    public CarePlanDto updateOutcome(
//            OutcomeUpdateRequest request) {
//
//        CarePlan carePlan =
//                carePlanRepository
//                        .findById(
//                                request.getCarePlanId()
//                        )
//                        .orElseThrow(() ->
//                                new RuntimeException(
//                                        "Care Plan not found: "
//                                                + request.getCarePlanId()
//                                )
//                        );
//
//        // Move current values to previous values
//
//        carePlan.setPreviousRisk(
//                carePlan.getCurrentRisk() != null
//                        ? carePlan.getCurrentRisk()
//                        : carePlan.getPredictionRisk()
//        );
//
//        carePlan.setPreviousWeight(
//                carePlan.getCurrentWeight()
//        );
//
//        carePlan.setPreviousBp(
//                carePlan.getCurrentBp()
//        );
//
//        carePlan.setPreviousSugar(
//                carePlan.getCurrentSugar()
//        );
//
//
//        // Store new/current values
//
//        carePlan.setCurrentRisk(
//                request.getCurrentRisk()
//        );
//
//        carePlan.setCurrentWeight(
//                request.getCurrentWeight()
//        );
//
//        carePlan.setCurrentBp(
//                request.getCurrentBp()
//        );
//
//        carePlan.setCurrentSugar(
//                request.getCurrentSugar()
//        );
//
//        carePlan.setUpdatedDate(
//                LocalDate.now()
//        );
//
//        CarePlan updatedCarePlan =
//                carePlanRepository.save(
//                        carePlan
//                );
//
//        return convertToDTO(
//                updatedCarePlan
//        );
//    }
//
//
//    // =====================================================
//    // COUNT
//    // =====================================================
//
//    public long getCarePlanCount() {
//
//        return carePlanRepository.count();
//    }
//
//
//    // =====================================================
//    // GET ALL CARE PLANS
//    // =====================================================
//
//    public List<CarePlan> getAllCarePlans() {
//
//        return carePlanRepository.findAll();
//    }
//}
