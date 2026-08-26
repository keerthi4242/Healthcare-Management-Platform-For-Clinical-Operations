package com.infosys.medisphere.dto;

import lombok.Data;

@Data
public class VitalDto {
    private Integer patientId;
    private Integer heartRate;
    private Integer systolicBP;
    private Integer diastolicBP;
    private Double temperature;
    private Integer spo2;
    private Integer respiratoryRate;
    private Integer bloodGlucoseLevel;
    private String timestamp;


}
