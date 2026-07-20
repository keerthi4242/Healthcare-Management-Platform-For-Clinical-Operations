package com.infosys.medisphere.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.infosys.medisphere.model.Consent;
@Repository
public interface ConsentRepository extends MongoRepository<Consent,String>{
	
    Consent findByPatientId(Integer patientId);
    Optional<Consent> findByPatientIdAndDoctorId(Integer patientId, Integer doctorId);

}
