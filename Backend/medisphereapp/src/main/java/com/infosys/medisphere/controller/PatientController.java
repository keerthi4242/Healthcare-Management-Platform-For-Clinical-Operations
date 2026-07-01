package com.infosys.medisphere.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.medisphere.model.Patient;
import com.infosys.medisphere.service.PatientService;

@RestController
@RequestMapping("patients")
public class PatientController {
	@Autowired
	private PatientService patientService;
	@PostMapping
	 public Patient addPatient(@RequestBody Patient patient) {
  	   return patientService.addPatient(patient);
    }
	@PostMapping("/many")
	 public List<Patient> addPatients(@RequestBody List<Patient> patients) {
 	   return patientService.addPatients(patients);
   }
	@GetMapping
	 public List<Patient> getAllPatient() {
  	   return patientService.getAllPatient();
    }
	@GetMapping("/{patientId}")
	 public Optional<Patient> getPatientById(@PathVariable int patientId) {
  	   return patientService.getPatientById(patientId);
    }
	@DeleteMapping("/{patientId}")
	 public void deletePatient(@PathVariable int patientId) {
 	    patientService.deletePatient(patientId);
   }
	@PutMapping
	 public Patient updatePatient(@RequestBody Patient patient) {
	        return patientService.updatePatient(patient);
	 }

}
