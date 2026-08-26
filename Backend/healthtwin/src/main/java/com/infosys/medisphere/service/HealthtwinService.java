package com.infosys.medisphere.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infosys.medisphere.kafka.AlertProducer;
import com.infosys.medisphere.model.AlertEvent;
import com.infosys.medisphere.model.Healthtwin;
import com.infosys.medisphere.model.Vital;
import com.infosys.medisphere.repository.HealthtwinRepository;

@Service
public class HealthtwinService {
	@Autowired
      private HealthtwinRepository healthtwinRepository;
	@Autowired
	private AlertProducer alertProducer;
  public Healthtwin createHealthtwin(Healthtwin healthtwin) {

      double bmi = healthtwin.getWeight()
              / Math.pow(healthtwin.getHeight() / 100, 2);

      healthtwin.setBmi(Math.round(bmi * 100.0) / 100.0);

      if (bmi < 18.5)
          healthtwin.setRisklevel("Underweight");
      else if (bmi < 25)
          healthtwin.setRisklevel("Normal");
      else if (bmi < 30)
          healthtwin.setRisklevel("Overweight");
      else
          healthtwin.setRisklevel("Obese");

      return healthtwinRepository.save(healthtwin);
  }
  public List<Healthtwin> getAllHealthTwins() {
      return healthtwinRepository.findAll();
  }

  public Optional<Healthtwin> getHealthTwinByPatientId(Integer patientId) {
      return healthtwinRepository.findByPatientId(patientId);
  }
  public Healthtwin updateHealthTwin(String twinId, Healthtwin updatedHealthTwin) {

	    Healthtwin existing = healthtwinRepository.findById(twinId)
	            .orElseThrow(() -> new RuntimeException("Health Twin not found"));

	    existing.setPatientId(updatedHealthTwin.getPatientId());
	    existing.setWeight(updatedHealthTwin.getWeight());
	    existing.setHeight(updatedHealthTwin.getHeight());
	    existing.setBloodSugar(updatedHealthTwin.getBloodSugar());

	    double heightInMeters = existing.getHeight() / 100.0;

	    double bmi = existing.getWeight() / (heightInMeters * heightInMeters);

	    existing.setBmi(Math.round(bmi * 100.0) / 100.0);
	    if (bmi < 18.5)
	        existing.setRisklevel("Underweight");
	    else if (bmi < 25)
	        existing.setRisklevel("Normal");
	    else if (bmi < 30)
	        existing.setRisklevel("Overweight");
	    else
	        existing.setRisklevel("Obese");

	    return healthtwinRepository.save(existing);
	}

  public void deleteHealthTwin(String twinId) {
	  healthtwinRepository.deleteById(twinId);
  }
// public void processVital(Vital vital) {
//	  Healthtwin twin = healthtwinRepository.findByPatientId(vital.getPatientId())
//	            .orElse(new Healthtwin());
//
//	    twin.setPatientId(vital.getPatientId());
//	    twin.setHeartRate(vital.getHeartRate());
//	    twin.setSystolicBP(vital.getSystolicBP());
//	    twin.setDiastolicBP(vital.getDiastolicBP());
//	    twin.setTemperature(vital.getTemperature());
//	    twin.setSpo2(vital.getSpo2());
//	    twin.setRespiratoryRate(vital.getRespiratoryRate());
//	    if (vital.getHeartRate() > 100
//	            || vital.getSpo2() < 92
//	            || vital.getTemperature() > 38.0
//	            || vital.getSystolicBP() > 140) {
//
//	        twin.setRisklevel("HIGH");
//
//	    } else {
//
//	        twin.setRisklevel("NORMAL");
//	    }
//	    healthtwinRepository.save(twin);
//  }
  public void processVital(Vital vital) {

	    // Update the Health Twin
	    Healthtwin twin = updateHealthTwin(vital);

	    // Evaluate clinical rules
	    String risk = evaluateClinicalRules(vital);
	    System.out.println("Risk = " + risk);

	    // Update risk level
	    twin.setRisklevel(risk);

	    // Save updated twin
	    healthtwinRepository.save(twin);
	    if (!risk.equals("NORMAL")) {

	        AlertEvent alert = AlertEvent.builder()
	                .patientId(vital.getPatientId())
	                .severity(risk)
	                .message("Abnormal Vital Signs Detected")
	                .heartRate(vital.getHeartRate())
	                .spo2(vital.getSpo2())
	                .temperature(vital.getTemperature())
	                .systolicBP(vital.getSystolicBP())
	                .diastolicBP(vital.getDiastolicBP())
	                .respiratoryRate(vital.getRespiratoryRate())
	                .timestamp(java.time.LocalDateTime.now())
	                .build();

	        alertProducer.publishAlert(alert);
	    }

	    System.out.println("Health Twin updated for Patient "
	            + vital.getPatientId() + " Risk: " + risk);
	}
 private Healthtwin updateHealthTwin(Vital vital) {

	    Healthtwin twin = healthtwinRepository
	            .findByPatientId(vital.getPatientId())
	            .orElse(new Healthtwin());

	    twin.setPatientId(vital.getPatientId());
	    twin.setHeartRate(vital.getHeartRate());
	    twin.setSystolicBP(vital.getSystolicBP());
	    twin.setDiastolicBP(vital.getDiastolicBP());
	    twin.setTemperature(vital.getTemperature());
	    twin.setSpo2(vital.getSpo2());
	    twin.setRespiratoryRate(vital.getRespiratoryRate());

	   // return healthtwinRepository.save(twin);
	    return twin;
	}
 private String evaluateClinicalRules(Vital vital) {

	    if (vital.getHeartRate() > 140)
	        return "CRITICAL";

	    if (vital.getSpo2() < 90)
	        return "CRITICAL";

	    if (vital.getTemperature() > 39)
	        return "HIGH";

	    if (vital.getSystolicBP() > 180)
	        return "CRITICAL";

	    return "NORMAL";
	}
}
      
       
