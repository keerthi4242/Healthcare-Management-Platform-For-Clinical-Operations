package com.infosys.medisphere.serviceimp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.infosys.medisphere.kafka.VitalProducer;
import com.infosys.medisphere.model.Vital;
import com.infosys.medisphere.service.VitalService;

@Service
public class VitalServiceImp implements VitalService {
	@Autowired
	 private VitalProducer vitalProducer;
	  @Autowired
	    private RestTemplate restTemplate;

	    private static final String API =
	        "https://6a5a552bad8332e75f0265ed.mockapi.io/patient-vitals/vitals";

	    public VitalServiceImp(VitalProducer vitalProducer) {
	        this.vitalProducer = vitalProducer;
	    }

	    @Override
	    public void publishVital(Vital vital) {
	        vitalProducer.publishVital(vital);
	    }
	    @Override
	    public Vital[] fetchVitals() {
	        return restTemplate.getForObject(API, Vital[].class);
	    }
}
