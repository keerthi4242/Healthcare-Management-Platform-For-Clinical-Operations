package com.infosys.medisphere.model;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlertEvent {
	private Integer patientId;

    private String severity;

    private String message;

    private Integer heartRate;

    private Integer spo2;

    private Double temperature;

    private Integer systolicBP;

    private Integer diastolicBP;

    private Integer respiratoryRate;

    private LocalDateTime timestamp;


}
