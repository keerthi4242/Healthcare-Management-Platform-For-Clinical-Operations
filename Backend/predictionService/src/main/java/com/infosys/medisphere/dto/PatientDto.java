package com.infosys.medisphere.dto;

import lombok.Data;

@Data
public class PatientDto {
	 private Integer patientId;
	    private String patientName;
	    private String patientGender;

	    // Diabetes
	    private Integer age;
	    private Integer hypertension;
	    private Integer heartDisease;
	    private String smokingHistory;
	    private Double bmi;
	    private Double hbA1cLevel;

	    // Heart
	    private Integer sex;
	    private Integer cp;
	    private Double chol;
	    private Integer fbs;
	    private Integer restecg;
	    private Integer exang;
	    private Double oldpeak;
	    private Integer slope;
	    private Integer ca;
	    private Integer thal;

}
