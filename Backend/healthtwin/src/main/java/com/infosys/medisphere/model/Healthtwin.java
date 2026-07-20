package com.infosys.medisphere.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection="healthtwins")
public class Healthtwin {
	@Id
    private String twinId;
    private int patientId;
    private Double weight;
    private Double height;
    private Integer heartRate;
    private Double bloodSugar;
    private Double bmi;
    private String risklevel;
    private int systolicBP;
    private int diastolicBP;
    private Double temperature;
    private int spo2;
    private int respiratoryRate;

}
