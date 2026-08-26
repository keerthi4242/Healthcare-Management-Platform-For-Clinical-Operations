package com.infosys.medisphere.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.infosys.medisphere.model.Vital;

@Repository
public interface VitalRepository  extends MongoRepository<Vital, Integer> {
	 List<Vital> findByPatientId(String patientId);


}
