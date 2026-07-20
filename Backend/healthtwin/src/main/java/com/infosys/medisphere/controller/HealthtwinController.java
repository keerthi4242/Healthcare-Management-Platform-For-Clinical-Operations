package com.infosys.medisphere.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.medisphere.model.Healthtwin;
import com.infosys.medisphere.service.HealthtwinService;

@RestController
@RequestMapping("healthtwin")
@CrossOrigin(origins = "*")
public class HealthtwinController {
	@Autowired
      private HealthtwinService healthtwinService;
	@PostMapping("/create")
	public Healthtwin createHealthtwin(@RequestBody Healthtwin healthtwin) {
	return healthtwinService.createHealthtwin(healthtwin);
	}
	@GetMapping("/all")
	public List<Healthtwin> getAllHealthTwins() {
        return healthtwinService.getAllHealthTwins();
    }
	@GetMapping("/{patientId}")
	 public Optional<Healthtwin> getHealthTwin(@PathVariable Integer patientId) {
	        return healthtwinService.getHealthTwinByPatientId(patientId);
	    }
	  @PutMapping("/update/{twinId}")
	    public Healthtwin updateHealthTwin(@PathVariable String twinId,@RequestBody Healthtwin healthtwin) {
	        return healthtwinService.updateHealthTwin(twinId,healthtwin);
	    }
	  @DeleteMapping("/{twinId}")
	    public void deleteHealthTwin(@PathVariable String twinId) {
	        healthtwinService.deleteHealthTwin(twinId);
	    }
	
      
}
