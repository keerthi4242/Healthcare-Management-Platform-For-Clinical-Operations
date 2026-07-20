package com.infosys.medisphere.model;

import java.util.List;

import lombok.Data;

@Data
public class CodeableConcept {
	 private List<Coding> coding;
	    private String text;

}
