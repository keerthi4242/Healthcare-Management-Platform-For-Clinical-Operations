package com.infosys.medisphere.dto;

import lombok.Data;

@Data
public class UpdateProgressRequest {
	private String carePlanId;
	private boolean medicineTaken; 
	private boolean exerciseDone; 
	private boolean bpChecked; 
	private boolean sugarChecked;

}
