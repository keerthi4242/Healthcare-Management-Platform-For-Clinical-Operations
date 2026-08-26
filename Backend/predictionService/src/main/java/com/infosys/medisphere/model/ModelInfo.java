package com.infosys.medisphere.model;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "models")
public class ModelInfo {

    @Id
    private String id;

    private String modelName;

    private String version;

    private String algorithm;

    private double accuracy;

    private LocalDate trainingDate;

    private String status;

    private String description;

}
