package com.infosys.medisphere.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class ConsentDto {
	 private Integer patientId;
	    private Integer doctorId;
	    private String permission;
	    private String purpose;
	    private String status;
	    private LocalDate startDate;
	    private LocalDate expiryDate;

}
