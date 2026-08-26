package com.infosys.medisphere.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.infosys.medisphere.model.DoctorAssignment;

@Repository
public interface DoctorAssignmentRepository  extends MongoRepository<DoctorAssignment, String>{
	List<DoctorAssignment> findByDoctorId(String doctorId);

    List<DoctorAssignment> findByPatientId(String patientId);

}
