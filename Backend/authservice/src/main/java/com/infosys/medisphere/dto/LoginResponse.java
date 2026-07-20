package com.infosys.medisphere.dto;

import lombok.Data;

@Data
public class LoginResponse {
	  private String access_token;
	    private String refresh_token;
	    private int expires_in;

}
