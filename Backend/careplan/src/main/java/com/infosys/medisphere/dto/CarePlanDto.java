package com.infosys.medisphere.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.Data;

@Data
public class CarePlanDto {

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
    private boolean medicineTaken;
    private boolean exerciseDone;
    private boolean bpChecked;
    private boolean sugarChecked;
}