package com.infosys.medisphere.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import com.infosys.medisphere.dto.LoginRequest;

@Service
public class AuthService {

    @Value("${keycloak.server-url}")
    private String serverUrl;

    @Value("${keycloak.realm}")
    private String realm;

    @Value("${keycloak.client-id}")
    private String clientId;

    @Value("${keycloak.client-secret}")
    private String clientSecret;


    public ResponseEntity<?> login(LoginRequest request) {

        RestTemplate restTemplate = new RestTemplate();

        String url = serverUrl +
                "/realms/" +
                realm +
                "/protocol/openid-connect/token";


        MultiValueMap<String,String> body = new LinkedMultiValueMap<>();

        body.add("client_id", clientId);
        body.add("client_secret", clientSecret);
        body.add("username", request.getUsername());
        body.add("password", request.getPassword());
        body.add("grant_type", "password");


        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(
                MediaType.APPLICATION_FORM_URLENCODED
        );


        HttpEntity<MultiValueMap<String,String>> entity =
                new HttpEntity<>(body, headers);


        return restTemplate.postForEntity(
                url,
                entity,
                Object.class
        );
    }

}
