package com.infosys.medisphere.kafka;

//import org.springframework.context.annotation.Profile;
import org.springframework.kafka.core.KafkaTemplate;
//import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.infosys.medisphere.model.Vital;
@Service
public class VitalProducer {
	 private final KafkaTemplate<String, Vital> kafkaTemplate;

	    public VitalProducer(KafkaTemplate<String, Vital> kafkaTemplate) {
	        this.kafkaTemplate = kafkaTemplate;
	    }

	    public void publishVital(Vital vital) {
	        kafkaTemplate.send("vital-topic", vital);
	        System.out.println("Published Vital to Kafka: " + vital);
	    }

}
