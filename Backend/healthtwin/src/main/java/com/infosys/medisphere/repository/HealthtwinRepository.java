package com.infosys.medisphere.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.infosys.medisphere.model.Healthtwin;

@Repository
public interface HealthtwinRepository extends MongoRepository<Healthtwin,String>{
	 Optional<Healthtwin> findByPatientId(Integer patientId);

}
