package com.infosys.medisphere.model;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "patient_fhir")
public class PatientResource {
	private String resourceType="patient";
	private String id;
	private List<Identifier> identifier;
	private List<HumanName> name;
	private String gender;
	private String birthDate;
	private List<Telecom> telecom;
	private List<Address> address;

}
