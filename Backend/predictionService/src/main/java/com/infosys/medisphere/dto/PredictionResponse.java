package com.infosys.medisphere.dto;

import lombok.Data;

@Data
public class PredictionResponse {

    private String prediction;
    private double probability;

    private String riskLevel;
    private String recommendation;

}
