package com.infosys.medisphere.kafka;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.infosys.medisphere.mapper.Fhirmapper;
import com.infosys.medisphere.model.ObservationResource;
import com.infosys.medisphere.model.Vital;

@Service
public class FhirConsumer {

    @Autowired
    private Fhirmapper mapper;

    private final Map<Integer, List<ObservationResource>> latestVitals =
            new ConcurrentHashMap<>();

    @KafkaListener(topics = "vital-topic", groupId = "fhir-group")
    public void consume(Vital vital) {

        List<ObservationResource> observations =
                mapper.toObservationResource(vital);

        latestVitals.put(vital.getPatientId(), observations);

        System.out.println("Latest vitals updated for patient " + vital.getPatientId());
    }

    public List<ObservationResource> getLatestVitals(int patientId) {
        return latestVitals.get(patientId);
    }
}