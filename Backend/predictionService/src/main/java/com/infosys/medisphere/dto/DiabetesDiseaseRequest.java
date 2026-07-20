package com.infosys.medisphere.dto;

import lombok.Data;

@Data
public class DiabetesDiseaseRequest {
	private Long patientId;
	 private String gender;
	    private double age;
	    private int hypertension;
	    private int heart_disease;
	    private String smoking_history;
	    private double bmi;
	    private double HbA1c_level;
	    private int blood_glucose_level;

}
