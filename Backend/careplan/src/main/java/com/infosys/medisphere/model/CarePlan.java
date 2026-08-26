package com.infosys.medisphere.model;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "careplans")
public class CarePlan {

    @Id
    private String id;

    private String patientId;

    private String predictionType;

    private double predictionRisk;

    private String riskLevel;

    private String prediction;

    private String recommendation;

    private String goal;

    private List<String> medications;

    private String diet;

    private String exercise;

    private String sleep;

    private String doctorNotes;

    private String doctorStatus;

    private int adherence;

    private Double previousRisk;
    private Double currentRisk;

    private Double previousWeight;
    private Double currentWeight;

    private Double previousBp;
    private Double currentBp;

    private Double previousSugar;
    private Double currentSugar;
    private LocalDate nextReview;

    private LocalDate createdDate;

    private LocalDate updatedDate;
    private boolean medicineTaken;

    private boolean exerciseDone;

    private boolean bpChecked;

    private boolean sugarChecked;
}