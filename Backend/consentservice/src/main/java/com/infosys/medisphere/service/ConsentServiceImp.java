package com.infosys.medisphere.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infosys.medisphere.dto.ConsentDto;
import com.infosys.medisphere.model.Consent;
import com.infosys.medisphere.repository.ConsentRepository;

@Service
public class ConsentServiceImp implements ConsentService{

	@Autowired
	private ConsentRepository consentRepository;
	@Override
	public Consent createConsent(ConsentDto dto) {

        Consent consent = new Consent();
        BeanUtils.copyProperties(dto, consent);
	return consentRepository.save(consent);

	}

	@Override
	public List<Consent> getAllConsents() {
		 return consentRepository.findAll();
	}

	@Override
	public Consent getConsentById(String id) {
		 return consentRepository.findById(id).orElse(null);
	}

//	@Override
//	public List<Consent> getConsentByPatient(Integer patientId) {
//		return consentRepository.findByPatientId(patientId);
//		
//	}

	@Override
	public Consent getConsentByPatient(Integer patientId) {
	    return consentRepository.findByPatientId(patientId);
	}

	@Override
	public Consent updateConsent(String id, ConsentDto dto) {
		 Consent consent = consentRepository.findById(id).orElse(null);
	        BeanUtils.copyProperties(dto, consent);
	        return consentRepository.save(consent);
	}

	@Override
	public void deleteConsent(String id) {
        Consent consent = consentRepository.findById(id).orElse(null);
        consentRepository.delete(consent);
		
	}

	@Override
	public boolean validateConsent(Integer patientId, Integer doctorId) {

        return consentRepository.findByPatientIdAndDoctorId(patientId, doctorId)
                .filter(consent ->
                        "ACTIVE".equalsIgnoreCase(consent.getStatus())
                        && consent.getExpiryDate().isAfter(LocalDate.now()))
                .isPresent();
	}
	@Override
	public long getConsentCount() {
	    return consentRepository.count();
	}

}
