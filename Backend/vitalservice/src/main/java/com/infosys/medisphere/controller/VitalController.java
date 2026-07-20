package com.infosys.medisphere.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.medisphere.model.Vital;
import com.infosys.medisphere.service.VitalService;

@RestController
@RequestMapping("/vitals")
public class VitalController {
	@Autowired
	 private VitalService vitalService;

    public VitalController(VitalService vitalService) {
        this.vitalService = vitalService;
    }
	 @PostMapping
	 public String publish(@RequestBody Vital vital) {

	        vitalService.publishVital(vital);

	        return "Vital sent to Kafka";
	    }

	 @GetMapping
	 public Vital[] getVitals() {

	     Vital[] vitals = vitalService.fetchVitals();

	     for (Vital vital : vitals) {
	         vitalService.publishVital(vital);
	     }

	     return vitals;
	 }
	    

	   

}
