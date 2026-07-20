package com.infosys.medisphere.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.medisphere.dto.LoginRequest;
import com.infosys.medisphere.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {
 
	private final AuthService authService;


    public AuthController(AuthService authService){
        this.authService = authService;
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request){

        return authService.login(request);
    }
}
