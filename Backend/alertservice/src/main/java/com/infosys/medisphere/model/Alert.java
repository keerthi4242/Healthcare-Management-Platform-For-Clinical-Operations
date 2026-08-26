package com.infosys.medisphere.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection="alerts")
public class Alert {
	  @Id
	    private String id;

	    private Integer patientId;

	    private String severity;

	    private String message;

	    private Integer heartRate;

	    private Integer spo2;

	    private Double temperature;

	    private Integer systolicBP;

	    private Integer diastolicBP;

	    private Integer respiratoryRate;

	    private String status;

	    private LocalDateTime createdAt;

}
