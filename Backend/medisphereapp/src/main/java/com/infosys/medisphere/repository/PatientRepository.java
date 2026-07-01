package com.infosys.medisphere.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.infosys.medisphere.model.Patient;

@Repository
public interface PatientRepository extends MongoRepository<Patient,Integer> {

}
