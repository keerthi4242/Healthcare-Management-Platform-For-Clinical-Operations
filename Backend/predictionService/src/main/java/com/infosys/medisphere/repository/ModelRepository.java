package com.infosys.medisphere.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.ui.Model;

import com.infosys.medisphere.model.ModelInfo;

@Repository
public interface ModelRepository extends MongoRepository<ModelInfo,String>{
	 List<ModelInfo> findByModelName(String modelName);
	

}
