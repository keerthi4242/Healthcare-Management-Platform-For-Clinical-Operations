package com.infosys.medisphere.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.infosys.medisphere.model.Doctor;

@Service
public interface DoctorService {
	List<Doctor> getAllDoctors();

    Doctor getDoctorById(String id);

    Doctor saveDoctor(Doctor doctor);

    Doctor updateDoctor(Doctor doctor);

    void deleteDoctor(String id);
    
    long countDoctors();
    Doctor getDoctorByKeycloakUserId(String keycloakUserId);

}
