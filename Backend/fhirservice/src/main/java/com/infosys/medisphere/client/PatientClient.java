package com.infosys.medisphere.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.infosys.medisphere.dto.Patientdto;


@FeignClient(name = "PATIENT-SERVICE")
public interface PatientClient {

	@GetMapping("/patients/{patientId}")
    Patientdto getPatientById(@PathVariable("patientId") int patientId);

}
