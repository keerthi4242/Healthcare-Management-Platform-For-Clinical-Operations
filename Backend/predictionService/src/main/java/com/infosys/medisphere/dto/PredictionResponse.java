package com.infosys.medisphere.dto;

import java.util.Map;

import lombok.Data;

@Data
public class PredictionResponse {

    private String prediction;
    private double probability;

    private String riskLevel;
    private String recommendation;
    private Map<String, Double> shap;

}
