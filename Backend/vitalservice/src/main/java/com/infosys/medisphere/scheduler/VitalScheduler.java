package com.infosys.medisphere.scheduler;

import java.util.concurrent.ThreadLocalRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.infosys.medisphere.model.Vital;
import com.infosys.medisphere.service.VitalService;

@Component
public class VitalScheduler {
	 @Autowired
	    private VitalService vitalService;

	 @Scheduled(fixedRate = 1000)
	 public void sendVitals() {

	     Vital[] vitals = vitalService.fetchVitals();

	     for (Vital vital : vitals) {

	         vital.setHeartRate(
	                 ThreadLocalRandom.current().nextInt(70, 91));

	         vital.setTemperature(
	                 ThreadLocalRandom.current().nextDouble(36.5, 37.5));

	         vital.setSpo2(
	                 ThreadLocalRandom.current().nextInt(96, 100));

	         vital.setSystolicBP(
	                 ThreadLocalRandom.current().nextInt(110, 131));

	         vital.setDiastolicBP(
	                 ThreadLocalRandom.current().nextInt(70, 91));

	         vitalService.publishVital(vital);
	     }
	 }

}
