package com.infosys.medisphere.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.infosys.medisphere.model.Alert;
import com.infosys.medisphere.model.AlertEvent;
import com.infosys.medisphere.repository.AlertRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class AlertService {
	
	  private final AlertRepository repository;

	    public void saveAlert(AlertEvent event){

	        Alert alert=Alert.builder()
	                .patientId(event.getPatientId())
	                .severity(event.getSeverity())
	                .message(event.getMessage())
	                .heartRate(event.getHeartRate())
	                .spo2(event.getSpo2())
	                .temperature(event.getTemperature())
	                .systolicBP(event.getSystolicBP())
	                .diastolicBP(event.getDiastolicBP())
	                .respiratoryRate(event.getRespiratoryRate())
	                .status("NEW")
	                .createdAt(event.getTimestamp())
	                .build();

	        repository.save(alert);

	        System.out.println("Alert Saved Successfully");
	    }

	    public List<Alert> getAllAlerts(){
	        return repository.findAll();
	    }

	    public Alert acknowledge(String id){

	        Alert alert=repository.findById(id).orElseThrow();

	        alert.setStatus("ACKNOWLEDGED");

	        return repository.save(alert);
	    }

	    public Alert close(String id){

	        Alert alert=repository.findById(id).orElseThrow();

	        alert.setStatus("CLOSED");

	        return repository.save(alert);
	    }
	    public long getAlertCount() {
	        return repository.count();
	    }
	    public List<Alert> getAlertsByPatient(Integer patientId) {
	        return repository.findByPatientId(patientId);
	    }

}
