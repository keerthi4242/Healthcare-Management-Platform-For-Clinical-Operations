package com.infosys.medisphere.model;

import java.util.List;

public class HumanName {
	  private String family;
	    private List<String> given;

	    public HumanName() {}

	    public String getFamily() {
	        return family;
	    }

	    public void setFamily(String family) {
	        this.family = family;
	    }

	    public List<String> getGiven() {
	        return given;
	    }

	    public void setGiven(List<String> given) {
	        this.given = given;
	    }

}
