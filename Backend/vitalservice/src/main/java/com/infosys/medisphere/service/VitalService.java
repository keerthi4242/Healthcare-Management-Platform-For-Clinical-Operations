package com.infosys.medisphere.service;

import com.infosys.medisphere.model.Vital;

public interface VitalService {
	 void publishVital(Vital vital);
	 Vital[] fetchVitals();

}
