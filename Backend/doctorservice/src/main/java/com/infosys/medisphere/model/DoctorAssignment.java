package com.infosys.medisphere.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection="doctor_assignments")

public class DoctorAssignment {

	    @Id
	    private String id;

	    private String doctorId;

	    private String patientId;

	}


