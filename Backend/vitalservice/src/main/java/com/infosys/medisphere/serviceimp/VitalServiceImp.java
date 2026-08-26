package com.infosys.medisphere.serviceimp;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infosys.medisphere.kafka.VitalProducer;
//import com.infosys.medisphere.kafka.VitalProducer;
import com.infosys.medisphere.model.Vital;
import com.infosys.medisphere.service.VitalService;

//import lombok.RequiredArgsConstructor;

@Service
//@RequiredArgsConstructor
public class VitalServiceImp implements VitalService {
	@Autowired
    private VitalProducer vitalProducer ;
	private Vital latestVital;
	private final Map<Integer, Vital> latestVitals = new ConcurrentHashMap<>();

	    @Override
	    public void publishVital(Vital vital) {
	        latestVitals.put(vital.getPatientId(), vital);
	       vitalProducer.publishVital(vital);
	        System.out.println("Stored Vital: " + vital);
	    }

	    @Override
	    public Vital getLatestVital(int patientId) {

	        return latestVitals.get(patientId);

	    }


@Override
public void setLatestVital(Vital vital){

    this.latestVital = vital;

}
	    
}
