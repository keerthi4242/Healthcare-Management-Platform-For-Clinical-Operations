package com.infosys.medisphere.dto;

import lombok.Data;

@Data
public class HeartDiseaseRequest {
	private Long patientId;
	 private int age;
	    private int sex;
	    private int cp;
	    private int trestbps;
	    private int chol;
	    private int fbs;
	    private int restecg;
	    private int thalach;
	    private int exang;
	    private double oldpeak;
	    private int slope;
	    private int ca;
	    private int thal;


}
