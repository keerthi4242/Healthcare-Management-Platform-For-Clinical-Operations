package com.infosys.medisphere.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.infosys.medisphere.model.DoctorAssignment;

@Service
public interface DoctorAssignmentService {
	 // Assign doctor to patient
    DoctorAssignment assignDoctor(DoctorAssignment assignment);

    // Get all patients assigned to a doctor
    List<DoctorAssignment> getPatientsByDoctor(String doctorId);

    // Get doctor assigned to a patient
    List<DoctorAssignment> getDoctorByPatient(String patientId);

    // Get all assignments
    List<DoctorAssignment> getAllAssignments();

    // Delete an assignment
    void deleteAssignment(String id);
 

}
