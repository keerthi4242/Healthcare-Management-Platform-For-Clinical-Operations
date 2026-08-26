package com.infosys.medisphere.model;

import lombok.Data;

@Data
public class Vital {
	 private int patientId;
	    private int heartRate;
	    private int systolicBP;
	    private int diastolicBP;
	    private double temperature;
	    private int spo2;
	    private int respiratoryRate;
	    private Integer bloodGlucoseLevel;
	    private String timestamp;

}
