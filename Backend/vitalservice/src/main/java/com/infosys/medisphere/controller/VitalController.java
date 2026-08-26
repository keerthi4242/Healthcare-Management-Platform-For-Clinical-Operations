package com.infosys.medisphere.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.medisphere.model.Vital;
import com.infosys.medisphere.scheduler.VitalScheduler;
import com.infosys.medisphere.service.VitalService;

@RestController
@RequestMapping("/vitals")
@CrossOrigin(origins = "*")
public class VitalController {

    private final VitalService vitalService;

    public VitalController(VitalService vitalService) {
        this.vitalService = vitalService;
    }

    @PostMapping
    public String publish(@RequestBody Vital vital) {

        vitalService.publishVital(vital);

        return "Vital sent to Kafka";
    }

    @GetMapping("/latest/{patientId}")
    public Vital getLatestVital(@PathVariable int patientId) {

        return vitalService.getLatestVital(patientId);

    }
//    @GetMapping("/latest/{patientId}")
//    public Vital getLatestVital(
//            @PathVariable int patientId) {
//
//
//        Vital vital = VitalScheduler.getLatestVital();
//
//        vital.setPatientId(patientId);
//
//        return vital;
//    }
}