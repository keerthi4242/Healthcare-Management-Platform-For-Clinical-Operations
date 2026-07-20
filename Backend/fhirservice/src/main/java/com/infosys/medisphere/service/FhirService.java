package com.infosys.medisphere.service;

import java.util.List;

import com.infosys.medisphere.model.ObservationResource;
import com.infosys.medisphere.model.PatientResource;

public interface FhirService {
	 PatientResource getPatientResource(int patientId);
	 long getFhirResourceCount();
	 List<ObservationResource> getLatestVitals(int patientId);

}
