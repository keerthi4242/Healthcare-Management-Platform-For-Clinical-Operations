package com.infosys.medisphere.kafka;


import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.infosys.medisphere.model.Vital;
import com.infosys.medisphere.service.HealthtwinService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class HealthtwinConsumer {
	
	 private final HealthtwinService healthTwinService;

	    @KafkaListener(
	            topics = "vital-topic",
	            groupId = "health-group",
	            containerFactory = "kafkaListenerContainerFactory")
	    public void consume(Vital vital) {
	    	 System.out.println("===== KAFKA LISTENER CALLED =====");
	        System.out.println("Received Vital: " + vital);

	        healthTwinService.processVital(vital);
	        System.out.println("Health Twin Updated");
	    }

}
