package com.infosys.medisphere.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infosys.medisphere.model.DoctorAssignment;
import com.infosys.medisphere.repository.DoctorAssignmentRepository;

@Service
public class DoctorAssignmentServiceImp implements DoctorAssignmentService {
	 @Autowired
	    private DoctorAssignmentRepository repository;

	    @Override
	    public DoctorAssignment assignDoctor(DoctorAssignment assignment) {
	        return repository.save(assignment);
	    }

	    @Override
	    public List<DoctorAssignment> getPatientsByDoctor(String doctorId) {
	        return repository.findByDoctorId(doctorId);
	    }

	    @Override
	    public List<DoctorAssignment> getDoctorByPatient(String patientId) {
	        return repository.findByPatientId(patientId);
	    }

	    @Override
	    public List<DoctorAssignment> getAllAssignments() {
	        return repository.findAll();
	    }

	    @Override
	    public void deleteAssignment(String id) {
	        repository.deleteById(id);
	    }

}
