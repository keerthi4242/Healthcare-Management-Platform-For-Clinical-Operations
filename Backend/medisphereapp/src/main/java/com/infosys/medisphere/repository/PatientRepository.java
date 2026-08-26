package com.infosys.medisphere.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.infosys.medisphere.model.Patient;

@Repository
public interface PatientRepository extends MongoRepository<Patient,Integer> {
	Optional<Patient> findByKeycloakUserId(String keycloakUserId);

}
