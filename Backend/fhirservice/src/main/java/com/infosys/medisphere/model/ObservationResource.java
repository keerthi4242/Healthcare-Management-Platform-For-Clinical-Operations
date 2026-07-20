package com.infosys.medisphere.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "observation_fhir")
public class ObservationResource {
	 private String resourceType = "Observation";
	 @Id
	    private String id;
	    private String status;
	    private CodeableConcept code;
	    private Reference subject;
	    private String effectiveDateTime;
	    private Quantity valueQuantity;
	
}
