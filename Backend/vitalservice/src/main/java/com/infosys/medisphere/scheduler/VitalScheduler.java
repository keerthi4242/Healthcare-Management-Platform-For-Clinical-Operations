package com.infosys.medisphere.scheduler;

import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.infosys.medisphere.model.Vital;
import com.infosys.medisphere.service.VitalService;

@Component
public class VitalScheduler {

    private final Random random = new Random();
    private final VitalService vitalService;
    public VitalScheduler(VitalService vitalService) {
        this.vitalService = vitalService;
    }

//    @Scheduled(fixedRate = 5000)
//    public void generateVitals() {
//
//        Vital vital = new Vital();
//
//        vital.setHeartRate(65 + random.nextInt(25));
//        vital.setSpo2(95 + random.nextInt(5));
//        vital.setTemperature(36.4 + random.nextDouble());
//        vital.setRespiratoryRate(12 + random.nextInt(9));
//
//        vital.setSystolicBP(110 + random.nextInt(21));
//        vital.setDiastolicBP(70 + random.nextInt(16));
//
//        vital.setBloodGlucoseLevel(80 + random.nextInt(121));
//
//        vital.setTimestamp(LocalDateTime.now().toString());
//        vitalService.setLatestVital(vital);
//        vitalService.publishVital(vital);
//
//        System.out.println("Generated Vitals: " + vital);
//       
//    }
    @Scheduled(fixedRate = 5000)
    public void generateVitals() {

    	 int[] patientIds = {1, 2, 3, 4, 6, 8};

    	    for (int patientId : patientIds) {

            Vital vital = new Vital();

            vital.setPatientId(patientId);
            if(random.nextInt(100)<10) {
            	vital.setHeartRate(140 + random.nextInt(20));
                vital.setSpo2(85 + random.nextInt(5));
                vital.setTemperature(39 + random.nextDouble());

                vital.setRespiratoryRate(25 + random.nextInt(8));

                vital.setSystolicBP(180 + random.nextInt(20));
                vital.setDiastolicBP(120 + random.nextInt(10));
                vital.setBloodGlucoseLevel(250 + random.nextInt(100));

            }
            else {

            vital.setHeartRate(65 + random.nextInt(25));
            vital.setSpo2(95 + random.nextInt(5));
            vital.setTemperature(36.4 + random.nextDouble());
            vital.setRespiratoryRate(12 + random.nextInt(9));

            vital.setSystolicBP(110 + random.nextInt(21));
            vital.setDiastolicBP(70 + random.nextInt(16));
            vital.setBloodGlucoseLevel(80 + random.nextInt(121));

            vital.setTimestamp(LocalDateTime.now().toString());

            vitalService.publishVital(vital);
        }
            vital.setTimestamp(LocalDateTime.now().toString());

            vitalService.publishVital(vital);
            }
    }
}