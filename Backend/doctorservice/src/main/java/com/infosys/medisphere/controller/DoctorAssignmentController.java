package com.infosys.medisphere.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.medisphere.model.DoctorAssignment;
import com.infosys.medisphere.service.DoctorAssignmentService;

@RestController
@RequestMapping("/assignments")
@CrossOrigin(origins = "*")
public class DoctorAssignmentController {
	 @Autowired
	    private DoctorAssignmentService service;

	    @PostMapping
	    public DoctorAssignment assignDoctor(
	            @RequestBody DoctorAssignment assignment){

	        return service.assignDoctor(assignment);
	    }

	    @GetMapping("/doctor/{doctorId}")
	    public List<DoctorAssignment> getDoctorPatients(
	            @PathVariable String doctorId){

	        return service.getPatientsByDoctor(doctorId);
	    }

	    @GetMapping("/patient/{patientId}")
	    public List<DoctorAssignment> getPatientDoctor(
	            @PathVariable String patientId){

	        return service.getDoctorByPatient(patientId);
	    }

	    @DeleteMapping("/{id}")
	    public void deleteAssignment(
	            @PathVariable String id){

	        service.deleteAssignment(id);
	    }

}
