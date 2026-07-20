package com.infosys.medisphere.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.infosys.medisphere.model.Prediction;

public interface PredictionRepository extends MongoRepository<Prediction, String>{
	List<Prediction> findByPatientId(Long patientId);

}
