package com.infosys.medisphere.controller;

import java.util.List;

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

import com.infosys.medisphere.model.Doctor;
import com.infosys.medisphere.service.DoctorService;


@RestController
@RequestMapping("/doctors")
@CrossOrigin(origins = "*")
public class DoctorController {
	 @Autowired
	    private DoctorService service;

	    @GetMapping
	    public List<Doctor> getAllDoctors() {
	        return service.getAllDoctors();
	    }

	    @GetMapping("/{id}")
	    public Doctor getDoctor(@PathVariable String id) {
	        return service.getDoctorById(id);
	    }

	    @PostMapping
	    public Doctor saveDoctor(@RequestBody Doctor doctor) {
	        return service.saveDoctor(doctor);
	    }

//	    @PutMapping
//	    public Doctor updateDoctor(@RequestBody Doctor doctor) {
//	        return service.updateDoctor(doctor);
//	    }
	    @PutMapping("/{id}")
	    public Doctor updateDoctor(
	            @PathVariable String id,
	            @RequestBody Doctor doctor) {

	        doctor.setDoctorId(id);

	        return service.updateDoctor(doctor);
	    }

	    @DeleteMapping("/{id}")
	    public void deleteDoctor(@PathVariable String id) {
	        service.deleteDoctor(id);
	    }
	    @GetMapping("/count")
	    public long countDoctors() {
	        return service.getAllDoctors().size();
	    }
	    @GetMapping("/profile/{keycloakUserId}")
	    public Doctor getDoctorProfile(@PathVariable String keycloakUserId) {
	        return service.getDoctorByKeycloakUserId(keycloakUserId);
	    }

}
