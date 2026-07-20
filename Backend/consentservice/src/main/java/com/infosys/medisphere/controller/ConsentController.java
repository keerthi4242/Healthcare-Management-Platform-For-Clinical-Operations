package com.infosys.medisphere.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.medisphere.dto.ConsentDto;
import com.infosys.medisphere.model.Consent;
import com.infosys.medisphere.service.ConsentService;

@RestController
@RequestMapping("/consents")
@CrossOrigin(origins = "*")
public class ConsentController {
	 @Autowired
	    private ConsentService consentService;

	    @PostMapping
	    public ResponseEntity<Consent> createConsent(@RequestBody ConsentDto dto) {
	        return new ResponseEntity<>(consentService.createConsent(dto), HttpStatus.CREATED);
	    }
	    @GetMapping
	    public ResponseEntity<List<Consent>> getAllConsents() {
	        return ResponseEntity.ok(consentService.getAllConsents());
	    }
	    @GetMapping("/{id}")
	    public ResponseEntity<Consent> getConsentById(@PathVariable String id) {
	        return ResponseEntity.ok(consentService.getConsentById(id));
	    }

//	    @GetMapping("/patient/{patientId}")
//	    public ResponseEntity<List<Consent>> getConsentByPatient(@PathVariable Integer patientId) {
//	        return ResponseEntity.ok(consentService.getConsentByPatient(patientId));
//	    }
	    @GetMapping("/patient/{patientId}")
	    public ResponseEntity<Consent> getConsentByPatient(@PathVariable Integer patientId) {
	        return ResponseEntity.ok(consentService.getConsentByPatient(patientId));
	    }
	    
	    
	    @PutMapping("/{id}")
	    public ResponseEntity<Consent> updateConsent(@PathVariable String id,
	                                                 @RequestBody ConsentDto dto) {
	        return ResponseEntity.ok(consentService.updateConsent(id, dto));
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<String> deleteConsent(@PathVariable String id) {
	        consentService.deleteConsent(id);
	        return ResponseEntity.ok("Consent deleted successfully");
	    }
	    @GetMapping("/validate")
	    public ResponseEntity<Boolean> validateConsent(
	            @RequestParam Integer patientId,
	            @RequestParam Integer doctorId) {

	        return ResponseEntity.ok(
	                consentService.validateConsent(patientId, doctorId));
	    }
	    @GetMapping("/count")
	    public long getConsentCount() {
	        return consentService.getConsentCount();
	    }

}
