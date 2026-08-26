package com.infosys.medisphere.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.medisphere.model.ModelInfo;
import com.infosys.medisphere.service.ModelService;

@RestController
@RequestMapping("/models")
@CrossOrigin("*")
public class ModelController {
	private ModelService service;
	 public ModelController(ModelService service) {
	        this.service = service;
	    }
	 @GetMapping
	    public List<ModelInfo> getAllModels() {
	        return service.getAllModels();
	    }
	 

	    @GetMapping("/{id}")
	    public ModelInfo getModel(@PathVariable String id) {
	        return service.getModel(id);
	    }

	    @PostMapping
	    public ModelInfo save(@RequestBody ModelInfo model) {
	        return service.saveModel(model);
	    }

	    @DeleteMapping("/{id}")
	    public void delete(@PathVariable String id) {
	        service.deleteModel(id);
	    }
	    @PutMapping("/{id}")
	    public ModelInfo updateModel(@PathVariable String id,
	                                 @RequestBody ModelInfo model) {
	        return service.updateModel(id, model);
	    }
	    @PatchMapping("/{id}/activate")
	    public ResponseEntity<ModelInfo> activateModel(@PathVariable String id) {

	        return ResponseEntity.ok(service.activateModel(id));
	    }
	    @PatchMapping("/{id}/deactivate")
	    public ResponseEntity<ModelInfo> deactivateModel(@PathVariable String id) {

	        return ResponseEntity.ok(service.deactivateModel(id));
	    }
	  
}
