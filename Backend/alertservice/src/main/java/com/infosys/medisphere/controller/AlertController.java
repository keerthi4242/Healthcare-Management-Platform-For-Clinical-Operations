package com.infosys.medisphere.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.medisphere.model.Alert;
import com.infosys.medisphere.service.AlertService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/alerts")
@CrossOrigin("*")
@RequiredArgsConstructor
public class AlertController {
	
	 private final AlertService service;

	    @GetMapping
	    public List<Alert> getAll(){

	        return service.getAllAlerts();
	    }

	    @PutMapping("/{id}/acknowledge")
	    public Alert acknowledge(@PathVariable String id){

	        return service.acknowledge(id);
	    }

	    @PutMapping("/{id}/close")
	    public Alert close(@PathVariable String id){

	        return service.close(id);
	    }
	    @GetMapping("/count")
	    public long getAlertCount() {
	        return service.getAlertCount();
	    }
	    @GetMapping("/patient/{patientId}")
	    public List<Alert> getAlertsByPatient(@PathVariable Integer patientId) {
	        return service.getAlertsByPatient(patientId);
	    }

}
