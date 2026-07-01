package com.infosys.medisphere.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "patients")
@Data
public class Patient {
       @Id
	private int patientId;
	private String patientName;
	private String patientAge;
	private String patientGender;
	private String patientNumber;
	private String patientDisease;
}
