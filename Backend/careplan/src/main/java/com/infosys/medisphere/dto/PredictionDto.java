package com.infosys.medisphere.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class PredictionDto {
	private Long patientId;

    private String predictionType;

    private String prediction;

    private double probability;

    private String riskLevel;

    private String recommendation;
     
    private LocalDateTime predictedAt;
    

}
