package com.infosys.medisphere.service;

import java.util.List;

import com.infosys.medisphere.dto.ConsentDto;
import com.infosys.medisphere.model.Consent;

public interface ConsentService {
	 Consent createConsent(ConsentDto dto);

	    List<Consent> getAllConsents();

	    Consent getConsentById(String id);

//	    List<Consent> getConsentByPatient(Integer patientId);
	    Consent getConsentByPatient(Integer patientId);

	    Consent updateConsent(String id, ConsentDto dto);

	    void deleteConsent(String id);

	    boolean validateConsent(Integer patientId, Integer doctorId);
	    long getConsentCount();

}
