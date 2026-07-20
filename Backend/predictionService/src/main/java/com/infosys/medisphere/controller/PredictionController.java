package com.infosys.medisphere.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.medisphere.dto.DiabetesDiseaseRequest;
import com.infosys.medisphere.dto.HeartDiseaseRequest;
import com.infosys.medisphere.dto.PredictionResponse;
import com.infosys.medisphere.model.Prediction;
import com.infosys.medisphere.service.PredictionService;

@RestController
@RequestMapping("/predict")
@CrossOrigin(origins = "*")
public class PredictionController {
	 @Autowired
	    private PredictionService predictionService;

	    @PostMapping("/diabetes")
	    public PredictionResponse predictDiabetes(@RequestBody DiabetesDiseaseRequest request) {

	        return predictionService.predictDiabetes(request);
	    }
	    @PostMapping("/heart")
	    public PredictionResponse predictHeart(@RequestBody HeartDiseaseRequest request) {

	        return predictionService.predictHeartDisease(request);
	    }
	    @GetMapping("/patient/{patientId}")
	    public List<Prediction> getPredictionHistory(@PathVariable Long patientId) {
	        return predictionService.getPredictionsByPatientId(patientId);
	    }
	    @GetMapping("/count")
	    public long getPredictionCount() {
	        return predictionService.getPredictionCount();
	    }


}
