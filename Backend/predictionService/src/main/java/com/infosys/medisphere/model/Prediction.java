package com.infosys.medisphere.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "predictions")
public class Prediction {
	@Id
    private String id;
    private Long patientId;
    private String predictionType;
    private String prediction;
    private double probability;
    private LocalDateTime predictedAt;
    private String riskLevel;
    private String recommendation;

}
