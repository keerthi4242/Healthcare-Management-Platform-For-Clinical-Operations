package com.infosys.medisphere.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "doctors")
public class Doctor {
	 @Id
	    private String doctorId;
	 private String keycloakUserId;

	    private String doctorName;
	    private String specialization;
	    private String gender;
	    private String email;
	    private String phone;
	    private String qualification;
	    private String experience;
	    private String status;

}

