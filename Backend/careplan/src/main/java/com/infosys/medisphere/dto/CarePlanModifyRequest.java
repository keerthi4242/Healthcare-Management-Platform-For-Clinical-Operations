package com.infosys.medisphere.dto;

import java.util.List;

import lombok.Data;

@Data
public class CarePlanModifyRequest {
	private String carePlanId;
	private String goal; 
	private List<String> medications; 
	private String diet; 
	private String exercise;
	private String sleep;
	private String doctorNotes;

}
