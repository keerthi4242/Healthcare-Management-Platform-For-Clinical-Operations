package com.infosys.medisphere.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infosys.medisphere.model.Doctor;
import com.infosys.medisphere.repository.DoctorRepository;

@Service
public class DoctorServiceImp implements DoctorService {
	 @Autowired
	    private DoctorRepository repository;

	    @Override
	    public List<Doctor> getAllDoctors() {
	        return repository.findAll();
	    }

	    @Override
	    public Doctor getDoctorById(String id) {
	        return repository.findById(id).orElse(null);
	    }

	    @Override
	    public Doctor saveDoctor(Doctor doctor) {
	        return repository.save(doctor);
	    }

	    @Override
	    public Doctor updateDoctor(Doctor doctor) {
	        return repository.save(doctor);
	    }

	    @Override
	    public void deleteDoctor(String id) {
	        repository.deleteById(id);
	    }
	    @Override
	    public long countDoctors() {
	        return repository.count();
	    }
	    @Override
	    public Doctor getDoctorByKeycloakUserId(String keycloakUserId) {
	        return repository.findByKeycloakUserId(keycloakUserId)
	                .orElseThrow(() -> new RuntimeException("Doctor not found"));
	    }

}
