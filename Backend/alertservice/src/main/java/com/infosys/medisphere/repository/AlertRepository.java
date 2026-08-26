package com.infosys.medisphere.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.infosys.medisphere.model.Alert;

public interface AlertRepository  extends MongoRepository<Alert,String> {
	 List<Alert> findByPatientId(Integer patientId);

}
