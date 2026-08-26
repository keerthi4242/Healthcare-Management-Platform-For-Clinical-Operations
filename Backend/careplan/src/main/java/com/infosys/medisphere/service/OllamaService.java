package com.infosys.medisphere.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class OllamaService {   
	private final RestTemplate restTemplate;
private final ObjectMapper objectMapper;

private final String OLLAMA_URL =
        "http://localhost:11434/api/generate";

public OllamaService(
        RestTemplate restTemplate,
        ObjectMapper objectMapper) {

    this.restTemplate = restTemplate;
    this.objectMapper = objectMapper;
}

public String generateCarePlan(String prompt) {

    Map<String, Object> request = new HashMap<>();

    request.put("model", "qwen2.5:3b");
    request.put("prompt", prompt);
    request.put("stream", false);

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);

    HttpEntity<Map<String, Object>> entity =
            new HttpEntity<>(request, headers);

    try {

        String response =
                restTemplate.postForObject(
                        OLLAMA_URL,
                        entity,
                        String.class
                );

        JsonNode json =
                objectMapper.readTree(response);

        return json.get("response").asText();

    } catch (Exception e) {

        throw new RuntimeException(
                "Failed to communicate with Ollama: "
                        + e.getMessage(),
                e
        );
    }
}

}
