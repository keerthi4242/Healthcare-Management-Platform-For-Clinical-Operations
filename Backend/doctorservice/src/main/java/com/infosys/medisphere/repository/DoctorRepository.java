package com.infosys.medisphere.repository;



import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.infosys.medisphere.model.Doctor;


@Repository
public interface DoctorRepository extends MongoRepository<Doctor,String> {

	Optional<Doctor> findByKeycloakUserId(String keycloakUserId);
}
