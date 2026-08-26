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

	    	    Patient existingPatient = patientRepository
	    	            .findById(patient.getPatientId())
	    	            .orElse(null);

	    	    if (existingPatient != null) {

	    	        // Basic Details
	    	        existingPatient.setPatientName(patient.getPatientName());
	    	        existingPatient.setPatientbirthDate(patient.getPatientbirthDate());
	    	        existingPatient.setPatientGender(patient.getPatientGender());
	    	        existingPatient.setPatientNumber(patient.getPatientNumber());
	    	        existingPatient.setPatientAddress(patient.getPatientAddress());
	    	        existingPatient.setPatientDisease(patient.getPatientDisease());

	    	        // Diabetes Fields
	    	        existingPatient.setAge(patient.getAge());
	    	        existingPatient.setHypertension(patient.getHypertension());
	    	        existingPatient.setHeartDisease(patient.getHeartDisease());
	    	        existingPatient.setSmokingHistory(patient.getSmokingHistory());
	    	        existingPatient.setBmi(patient.getBmi());
	    	        existingPatient.setHbA1cLevel(patient.getHbA1cLevel());

	    	        // Heart Disease Fields
	    	        existingPatient.setSex(patient.getSex());
	    	        existingPatient.setCp(patient.getCp());
	    	        existingPatient.setChol(patient.getChol());
	    	        existingPatient.setFbs(patient.getFbs());
	    	        existingPatient.setRestecg(patient.getRestecg());
	    	        existingPatient.setExang(patient.getExang());
	    	        existingPatient.setOldpeak(patient.getOldpeak());
	    	        existingPatient.setSlope(patient.getSlope());
	    	        existingPatient.setCa(patient.getCa());
	    	        existingPatient.setThal(patient.getThal());

	    	        return patientRepository.save(existingPatient);
	    	    }

	    	    return null;
	    	}
	      public long getPatientCount() {
	    	    return patientRepository.count();
	    	}
	      public Patient getPatientByKeycloakUserId(String keycloakUserId) {

	          return patientRepository.findByKeycloakUserId(keycloakUserId)
	                  .orElseThrow(() -> new RuntimeException("Patient not found"));

	      }
}
