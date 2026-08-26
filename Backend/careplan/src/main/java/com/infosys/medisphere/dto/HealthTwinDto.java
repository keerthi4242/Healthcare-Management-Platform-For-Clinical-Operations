package com.infosys.medisphere.dto;

import lombok.Data;

@Data
public class HealthTwinDto { private int patientId;
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
