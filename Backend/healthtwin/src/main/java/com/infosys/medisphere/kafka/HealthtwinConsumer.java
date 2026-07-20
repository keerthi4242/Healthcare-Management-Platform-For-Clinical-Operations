package com.infosys.medisphere.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.infosys.medisphere.model.Vital;
import com.infosys.medisphere.service.HealthtwinService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class HealthtwinConsumer {
	@Autowired
	 private  HealthtwinService healthTwinService;

	    @KafkaListener(
	            topics = "vital-topic",
	            groupId = "health-group",
	            containerFactory = "kafkaListenerContainerFactory")
	    public void consume(Vital vital) {

	        System.out.println("Received Vital: " + vital);

	        healthTwinService.processVital(vital);
	    }

}
