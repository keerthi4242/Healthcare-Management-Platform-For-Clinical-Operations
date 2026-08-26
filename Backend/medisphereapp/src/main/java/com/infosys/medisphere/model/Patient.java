package com.infosys.medisphere.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "patients")
@Data
public class Patient {
       @Id
	private int patientId;
       private String keycloakUserId;
	private String patientName;
	private String patientbirthDate;
	private String patientGender;
	private String patientNumber;
	private String patientAddress;
	private String patientDisease;
	  // Diabetes Prediction Fields
    private Integer age;
    private Integer hypertension;
    private Integer heartDisease;
    private String smokingHistory;
    private Double bmi;
    private Double hbA1cLevel;
    // Heart Disease Prediction Fields
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
