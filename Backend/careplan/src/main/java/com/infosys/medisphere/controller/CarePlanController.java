package com.infosys.medisphere.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.medisphere.dto.CarePlanApprovalRequest;
import com.infosys.medisphere.dto.CarePlanDto;
import com.infosys.medisphere.dto.CarePlanModifyRequest;
import com.infosys.medisphere.dto.CarePlanRequest;
import com.infosys.medisphere.dto.OutcomeUpdateRequest;
import com.infosys.medisphere.dto.UpdateProgressRequest;
import com.infosys.medisphere.model.CarePlan;
import com.infosys.medisphere.service.CarePlanService;

@RestController
@RequestMapping("/careplan")
@CrossOrigin(origins="*")
public class CarePlanController {
	@Autowired
	private CarePlanService carePlanService;
	  @PostMapping("/generate")
	    public ResponseEntity<CarePlanDto> generateCarePlan(
	            @RequestBody CarePlanRequest request) {


	        CarePlanDto carePlan =
	                carePlanService.generateCarePlan(
	                        request.getPatientId()
	                );


	        return ResponseEntity.ok(carePlan);
	    }
	  @GetMapping("/{patientId}")
	    public ResponseEntity<CarePlanDto> getCarePlan(
	            @PathVariable String patientId) {


	        CarePlanDto carePlan =
	                carePlanService.getCarePlan(
	                        patientId
	                );


	        return ResponseEntity.ok(carePlan);
	    }
	  @GetMapping("/history/{patientId}")
	    public ResponseEntity<List<CarePlanDto>>
	    getCarePlanHistory(
	            @PathVariable String patientId) {


	        List<CarePlanDto> history =
	                carePlanService.getCarePlanHistory(
	                        patientId
	                );


	        return ResponseEntity.ok(history);
	    }
	  @PutMapping("/approve")
	  public ResponseEntity<CarePlanDto> approveCarePlan(
	          @RequestBody CarePlanApprovalRequest request) {

	      CarePlanDto carePlan =
	              carePlanService.approveCarePlan(
	                      request.getCarePlanId(),
	                      request.getDoctorNotes()
	              );

	      return ResponseEntity.ok(carePlan);
	  }
	  @PutMapping("/updateProgress")
	  public CarePlanDto updateProgress(
	          @RequestBody UpdateProgressRequest request) {

	      return carePlanService.updateProgress(request);
	  }
	  @PutMapping("/modify")
	  public ResponseEntity<CarePlanDto> modifyCarePlan(
	          @RequestBody CarePlanModifyRequest request) {

	      CarePlanDto carePlan =
	              carePlanService.modifyCarePlan(request);

	      return ResponseEntity.ok(carePlan);
	  }
	  @PutMapping("/updateOutcome")
	  public ResponseEntity<CarePlanDto> updateOutcome(
	          @RequestBody OutcomeUpdateRequest request) {

	      CarePlanDto carePlan =
	              carePlanService.updateOutcome(request);

	      return ResponseEntity.ok(carePlan);
	  }
	  @GetMapping("/count")
	  public long getCarePlanCount() {
	      return carePlanService.getCarePlanCount();
	  }
	  @GetMapping
	  public List<CarePlan> getAllCarePlans() {
	      return carePlanService.getAllCarePlans();
	  }

	

}
