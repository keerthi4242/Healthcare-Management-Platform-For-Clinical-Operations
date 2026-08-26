package com.infosys.medisphere.dto;

import lombok.Data;

@Data
public class CarePlanApprovalRequest {
    private String carePlanId;

    private String doctorNotes;


}
