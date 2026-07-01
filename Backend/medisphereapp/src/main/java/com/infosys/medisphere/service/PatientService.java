package com.infosys.medisphere.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infosys.medisphere.model.Patient;
import com.infosys.medisphere.repository.PatientRepository;

@Service
public class PatientService {
	      @Autowired
         private  PatientRepository patientRepository;
	      public Patient addPatient(Patient patient) {
	    	   return patientRepository.save(patient);
	      }
	      public List<Patient> addPatients(List<Patient> patients) {
	    	   return patientRepository.saveAll(patients);
	      }
	      public List<Patient> getAllPatient() {
	    	   return patientRepository.findAll();
	      }
	      public Optional<Patient> getPatientById(int patientId) {
	    	   return patientRepository.findById(patientId);
	      }
	      public void deletePatient(int patientId) {
	    	    patientRepository.deleteById(patientId);
	      }
	      public Patient updatePatient(Patient patient) {
	    	  Patient existingPatient = patientRepository.findById(patient.getPatientId())
	    	            .orElse(null);

	    	    if (existingPatient != null) {

	    	        existingPatient.setPatientName(patient.getPatientName());
	    	        existingPatient.setPatientAge(patient.getPatientAge());
	    	        existingPatient.setPatientGender(patient.getPatientGender());
	    	        existingPatient.setPatientNumber(patient.getPatientNumber());
	    	        existingPatient.setPatientDisease(patient.getPatientDisease());

	    	        return patientRepository.save(existingPatient);
	    	    }

	    	    return null;
	      }
}
