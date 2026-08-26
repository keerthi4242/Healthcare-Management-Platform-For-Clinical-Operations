package com.infosys.medisphere.dto;

import lombok.Data;

@Data
public class OutcomeUpdateRequest {
	private String carePlanId;

    private Double currentRisk;

    private Double currentWeight;

    private Double currentBp;

    private Double currentSugar;

}
