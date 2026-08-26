package com.infosys.medisphere.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.infosys.medisphere.model.AlertEvent;
import com.infosys.medisphere.service.AlertService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AlertConsumer {
	
	 private  final AlertService alertService;

	    @KafkaListener(
	            topics="alerts-stream",
	            groupId="alert-group",
	            containerFactory="kafkaListenerContainerFactory")
	    public void consume(AlertEvent event){

	        System.out.println("Received Alert : "+event);

	        alertService.saveAlert(event);

	    }


}
