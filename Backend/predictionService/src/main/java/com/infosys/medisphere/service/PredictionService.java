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
import com.infosys.medisphere.repository.PredictionRepository;

@Service
public class PredictionService {
    @Autowired
    private PredictionRepository predictionRepository;
    @Autowired
    private RestTemplate restTemplate;
	public PredictionResponse predictDiabetes(DiabetesDiseaseRequest diabetesrequest) {
		String url = "http://localhost:5000/predict-diabetes";

        PredictionResponse response =
                restTemplate.postForObject(
                        url,
                        diabetesrequest,
                        PredictionResponse.class
                );
        if ("Diabetes".equalsIgnoreCase(response.getPrediction())) {

            if (response.getProbability() >= 0.80) {
                response.setRiskLevel("High Risk");
                response.setRecommendation("Consult an endocrinologist immediately.");
            } else if (response.getProbability() >= 0.50) {
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
		String url = "http://localhost:5000/predict-heart";

        PredictionResponse response =
                restTemplate.postForObject(
                        url,
                        heartrequest,
                        PredictionResponse.class
                );

if ("Heart Disease".equalsIgnoreCase(response.getPrediction())) {

    if (response.getProbability() >= 0.80) {
        response.setRiskLevel("High Risk");
        response.setRecommendation("Consult a cardiologist immediately.");
    } else if (response.getProbability() >= 0.50) {
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

}
