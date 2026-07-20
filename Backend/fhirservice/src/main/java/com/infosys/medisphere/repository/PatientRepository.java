package com.infosys.medisphere.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.infosys.medisphere.model.PatientResource;

public interface PatientRepository extends MongoRepository<PatientResource, String> {

}
