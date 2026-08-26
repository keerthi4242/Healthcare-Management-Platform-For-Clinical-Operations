package com.infosys.medisphere.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.infosys.medisphere.dto.DiabetesDiseaseRequest;
import com.infosys.medisphere.dto.HeartDiseaseRequest;
import com.infosys.medisphere.dto.PredictionResponse;
import com.infosys.medisphere.model.Prediction;
import com.infosys.medisphere.model.Vital;
import com.infosys.medisphere.repository.PredictionRepository;

@Service
public class PredictionService {
    @Autowired
    private PredictionRepository predictionRepository;
    @Autowired
    private RestTemplate restTemplate;
  //  @Autowired
   // private VitalService vitalService;
	public PredictionResponse predictDiabetes(DiabetesDiseaseRequest diabetesrequest) {
		Vital vital = restTemplate.getForObject(
			    "http://localhost:8085/vitals/latest/" + diabetesrequest.getPatientId(),
			    Vital.class
			);

		if (vital != null) {
		    diabetesrequest.setBlood_glucose_level(vital.getBloodGlucoseLevel());
		}
		
		String url = "http://localhost:5000/predict-diabetes";

        PredictionResponse response =
                restTemplate.postForObject(
                        url,
                        diabetesrequest,
                        PredictionResponse.class
                );
        if (response.getPrediction() != null &&
        	    response.getPrediction().trim().equalsIgnoreCase("Diabetes")) {

        	    double probability = response.getProbability();

            if (probability >= 0.80) {
                response.setRiskLevel("High Risk");
                response.setRecommendation("Consult an endocrinologist immediately.");
            } else if (probability >= 0.50) {
                response.setRiskLevel("Moderate Risk");
                response.setRecommendation("Monitor blood glucose regularly and consult a physician.");
            } else {
                response.setRiskLevel("Low Risk");
                response.setRecommendation("Maintain a balanced diet and exercise regularly.");
            }

        } else {

            response.setRiskLevel("Low Risk");
            response.setRecommendation("No immediate signs of diabetes. Continue healthy eating and regular exercise.");

        }
        Prediction prediction = new Prediction();

        prediction.setPatientId(diabetesrequest.getPatientId());
        prediction.setPredictionType("Diabetes");
        prediction.setPrediction(response.getPrediction());
        prediction.setProbability(response.getProbability());
        prediction.setRiskLevel(response.getRiskLevel());
        prediction.setRecommendation(response.getRecommendation());
        prediction.setPredictedAt(LocalDateTime.now());

        predictionRepository.save(prediction);

        return response;
		
	}
	public PredictionResponse predictHeartDisease(HeartDiseaseRequest heartrequest) {

	   // Vital vital = vitalService.getLatestVital(heartrequest.getPatientId().intValue());
		Vital vital = restTemplate.getForObject(
			    "http://localhost:8085/vitals/latest/" + heartrequest.getPatientId(),
			    Vital.class
			);

	    if (vital != null) {
	        heartrequest.setTrestbps(vital.getSystolicBP());
	        heartrequest.setThalach(vital.getHeartRate());
	    }
		String url = "http://localhost:5000/predict-heart";

        PredictionResponse response =
                restTemplate.postForObject(
                        url,
                        heartrequest,
                        PredictionResponse.class
                );

        if (response.getPrediction() != null &&
        	    response.getPrediction().trim().equalsIgnoreCase("Heart Disease")) {

        	    double probability = response.getProbability();

    if (probability>= 0.80) {
        response.setRiskLevel("High Risk");
        response.setRecommendation("Consult a cardiologist immediately.");
    } else if (probability >= 0.50) {
        response.setRiskLevel("Moderate Risk");
        response.setRecommendation("Schedule a medical check-up and monitor your heart health.");
    } else {
        response.setRiskLevel("Low Risk");
        response.setRecommendation("Maintain a healthy lifestyle and attend regular health check-ups.");
    }

} else {

    response.setRiskLevel("Low Risk");
    response.setRecommendation("No immediate signs of heart disease. Continue a healthy lifestyle.");

}
        Prediction prediction = new Prediction();

        prediction.setPatientId(heartrequest.getPatientId());
        prediction.setPredictionType("Heart Disease");
        prediction.setPrediction(response.getPrediction());
        prediction.setProbability(response.getProbability());
        prediction.setRiskLevel(response.getRiskLevel());
        prediction.setRecommendation(response.getRecommendation());
        prediction.setPredictedAt(LocalDateTime.now());

        predictionRepository.save(prediction);

        return response;
		
	}
	public List<Prediction> getPredictionsByPatientId(Long patientId) {
	    return predictionRepository.findByPatientId(patientId);
	}
	   public long getPredictionCount() {
	        return predictionRepository.count();
	    }
	   public List<Prediction> getAllPredictions() {
		    return predictionRepository.findAll();
		}

}
