package com.infosys.medisphere.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.infosys.medisphere.model.CarePlan;

@Repository
public interface CarePlanRepository extends MongoRepository<CarePlan,String> {

    Optional<CarePlan> findByPatientId(String patientId);

    List<CarePlan> findAllByPatientId(String patientId);
	

}
