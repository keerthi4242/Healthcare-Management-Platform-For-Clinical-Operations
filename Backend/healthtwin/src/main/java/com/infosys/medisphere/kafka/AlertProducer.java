package com.infosys.medisphere.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.infosys.medisphere.model.AlertEvent;

@Service
public class AlertProducer {
	@Autowired
	  private  KafkaTemplate<String, AlertEvent> kafkaTemplate;

	    public void publishAlert(AlertEvent alert) {

	        kafkaTemplate.send("alerts-stream", alert);

	        System.out.println("Alert Published : " + alert);
	    }

}
