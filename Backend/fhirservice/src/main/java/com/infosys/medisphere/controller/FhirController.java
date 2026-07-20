package com.infosys.medisphere.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.medisphere.model.ObservationResource;
import com.infosys.medisphere.model.PatientResource;
import com.infosys.medisphere.service.FhirService;

@RestController
@RequestMapping("/fhir")
@CrossOrigin(origins = "*")
public class FhirController {
	 @Autowired
	    private FhirService fhirService;

	    @GetMapping("/patient/{patientId}")
	    public PatientResource getPatient(@PathVariable int patientId) {
	        return fhirService.getPatientResource(patientId);
	    }

	    @GetMapping("/observation/{patientId}")
	    public List<ObservationResource> getLatestVitals(@PathVariable int patientId) {
	        return fhirService.getLatestVitals(patientId);
	    }
@GetMapping("/count")
public long getFhirResourceCount() {
    return fhirService.getFhirResourceCount();
}
}
