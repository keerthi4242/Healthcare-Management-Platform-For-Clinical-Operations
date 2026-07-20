package com.infosys.medisphere.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.infosys.medisphere.dto.Patientdto;
import com.infosys.medisphere.model.Address;
import com.infosys.medisphere.model.CodeableConcept;
import com.infosys.medisphere.model.Coding;
import com.infosys.medisphere.model.HumanName;
import com.infosys.medisphere.model.Identifier;
import com.infosys.medisphere.model.ObservationResource;
import com.infosys.medisphere.model.PatientResource;
import com.infosys.medisphere.model.Quantity;
import com.infosys.medisphere.model.Telecom;
import com.infosys.medisphere.model.Reference;
import com.infosys.medisphere.model.Vital;


	@Component
	public class Fhirmapper {
public PatientResource toPatientResource(Patientdto dto) {

	        PatientResource resource = new PatientResource();

	        resource.setResourceType("Patient");

	        resource.setId(String.valueOf(dto.getPatientId()));

	       
	        Identifier identifier = new Identifier();
	        identifier.setSystem("https://medisphere.com/patient");
	        identifier.setValue(String.valueOf(dto.getPatientId()));

	        List<Identifier> identifiers = new ArrayList<>();
	        identifiers.add(identifier);
	        resource.setIdentifier(identifiers);

	       
	        HumanName name = new HumanName();
	        List<String> given = new ArrayList<>();
	        given.add(dto.getPatientName());

	        name.setGiven(given);

	        List<HumanName> names = new ArrayList<>();
	        names.add(name);
	        resource.setName(names);

	        
	        resource.setGender(dto.getPatientGender());

	      
	        resource.setBirthDate(dto.getPatientbirthDate());

	        Telecom telecom = new Telecom();
	        telecom.setSystem("phone");
	        telecom.setValue(dto.getPatientNumber());

	        List<Telecom> telecoms = new ArrayList<>();
	        telecoms.add(telecom);
	        resource.setTelecom(telecoms);
	        
	        Address address = new Address();
	        address.setText(dto.getPatientAddress());

	        List<Address> addresses = new ArrayList<>();
	        addresses.add(address); 

	        resource.setAddress(addresses);

	        return resource;
	     
	    }
private ObservationResource createObservation(String code,
        String display,
        double value,
        String unit,
        String unitCode,
        Vital vital) {

ObservationResource observation = new ObservationResource();

observation.setResourceType("Observation");
observation.setId(code + "-" + vital.getPatientId());
observation.setStatus("final");

Coding coding = new Coding();
coding.setSystem("http://loinc.org");
coding.setCode(code);
coding.setDisplay(display);

CodeableConcept concept = new CodeableConcept();
concept.setCoding(List.of(coding));
concept.setText(display);

observation.setCode(concept);

Reference reference = new Reference();
reference.setReference("Patient/" + vital.getPatientId());
reference.setDisplay("Patient " + vital.getPatientId());

observation.setSubject(reference);

observation.setEffectiveDateTime(vital.getTimestamp());

Quantity quantity = new Quantity();
quantity.setValue(value);
quantity.setUnit(unit);
quantity.setSystem("http://unitsofmeasure.org");
quantity.setCode(unitCode);

observation.setValueQuantity(quantity);

return observation;
}
public List<ObservationResource> toObservationResource(Vital vital){
	 List<ObservationResource> observations = new ArrayList<>();

	    observations.add(createObservation(
	            "8867-4",
	            "Heart Rate",
	            vital.getHeartRate(),
	            "beats/minute",
	            "/min",
	            vital));

	    observations.add(createObservation(
	            "8310-5",
	            "Body Temperature",
	            vital.getTemperature(),
	            "Cel",
	            "Cel",
	            vital));

	    observations.add(createObservation(
	            "9279-1",
	            "Respiratory Rate",
	            vital.getRespiratoryRate(),
	            "breaths/minute",
	            "/min",
	            vital));

	    observations.add(createObservation(
	            "59408-5",
	            "Oxygen Saturation",
	            vital.getSpo2(),
	            "%",
	            "%",
	            vital));

	    observations.add(createObservation(
	            "8480-6",
	            "Systolic Blood Pressure",
	            vital.getSystolicBP(),
	            "mmHg",
	            "mm[Hg]",
	            vital));

	    observations.add(createObservation(
	            "8462-4",
	            "Diastolic Blood Pressure",
	            vital.getDiastolicBP(),
	            "mmHg",
	            "mm[Hg]",
	            vital));

	    return observations;
}
}
