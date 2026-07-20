package com.infosys.medisphere.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infosys.medisphere.client.PatientClient;
import com.infosys.medisphere.dto.Patientdto;
import com.infosys.medisphere.kafka.FhirConsumer;
import com.infosys.medisphere.mapper.Fhirmapper;
import com.infosys.medisphere.model.ObservationResource;
import com.infosys.medisphere.model.PatientResource;
import com.infosys.medisphere.repository.ObservationRepository;
import com.infosys.medisphere.repository.PatientRepository;
import com.infosys.medisphere.service.FhirService;

@Service
public class FhirServiceImp implements FhirService {

    @Autowired
    private PatientClient patientClient;
    @Autowired
    private ObservationRepository observationRepository;
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private Fhirmapper fhirMapper;
    @Autowired
    private FhirConsumer fhirConsumer;

	@Override
	public PatientResource getPatientResource(int patientId) {
		Patientdto dto = patientClient.getPatientById(patientId);
		PatientResource resource = fhirMapper.toPatientResource(dto);
		 patientRepository.save(resource); 
		 System.out.println("Patient saved to MongoDB: " + resource);
		 return resource;
	}

	
	@Override
	public long getFhirResourceCount() {
	    return patientRepository.count();
	}

	@Override
	public List<ObservationResource> getLatestVitals(int patientId) {
	    return fhirConsumer.getLatestVitals(patientId);
	}
}
