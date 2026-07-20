package com.infosys.medisphere.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.infosys.medisphere.model.ObservationResource;

public interface ObservationRepository extends MongoRepository<ObservationResource, String> {
	  List<ObservationResource> findBySubjectReference(String reference);
	  Optional<ObservationResource> findTopBySubjectReferenceOrderByEffectiveDateTimeDesc(String reference);

}
