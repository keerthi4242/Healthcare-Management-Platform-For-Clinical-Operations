package com.infosys.medisphere.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.infosys.medisphere.model.ModelInfo;
import com.infosys.medisphere.repository.ModelRepository;

@Service
public class ModelService {
	 private  ModelRepository repository;
	 
	 public ModelService(ModelRepository repository) {
	        this.repository = repository;
	    }
	 public List<ModelInfo> getAllModels() {
	        return repository.findAll();
	    }
	  public ModelInfo getModel(String id) {
	        return repository.findById(id).orElse(null);
	    }
	  public ModelInfo saveModel(ModelInfo model) {
	        return repository.save(model);
	    }
	  public void deleteModel(String id) {
	        repository.deleteById(id);
	    }
	  public ModelInfo updateModel(String id, ModelInfo updatedModel) {

		    ModelInfo existing = repository.findById(id)
		            .orElseThrow(() -> new RuntimeException("Model not found"));

		    existing.setModelName(updatedModel.getModelName());
		    existing.setVersion(updatedModel.getVersion());
		    existing.setAlgorithm(updatedModel.getAlgorithm());
		    existing.setAccuracy(updatedModel.getAccuracy());
		    existing.setTrainingDate(updatedModel.getTrainingDate());
		    existing.setStatus(updatedModel.getStatus());
		    existing.setDescription(updatedModel.getDescription());

		    return repository.save(existing);
		}
	  public ModelInfo getModelById(String id) {
	        return repository.findById(id).orElse(null);
	    }
	   public ModelInfo activateModel(String id) {

	        ModelInfo activeModel = repository.findById(id)
	                .orElseThrow(() -> new RuntimeException("Model not found"));

	        // Deactivate all versions of the same model
	        List<ModelInfo> models = repository.findByModelName(activeModel.getModelName());

	        for (ModelInfo model : models) {
	            model.setStatus("Inactive");
	            repository.save(model);
	        }

	        // Activate selected model
	        activeModel.setStatus("Active");

	        return repository.save(activeModel);
	    }

	    // Deactivate model
	    public ModelInfo deactivateModel(String id) {

	        ModelInfo model = repository.findById(id)
	                .orElseThrow(() -> new RuntimeException("Model not found"));

	        model.setStatus("Inactive");

	        return repository.save(model);
	    }

	}


