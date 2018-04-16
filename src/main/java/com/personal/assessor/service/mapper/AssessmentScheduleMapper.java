package com.personal.assessor.service.mapper;

import com.personal.assessor.domain.*;
import com.personal.assessor.service.dto.AssessmentScheduleDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity AssessmentSchedule and its DTO AssessmentScheduleDTO.
 */
@Mapper(componentModel = "spring", uses = {ComplianceScheduleMapper.class})
public interface AssessmentScheduleMapper extends EntityMapper<AssessmentScheduleDTO, AssessmentSchedule> {



    default AssessmentSchedule fromId(Long id) {
        if (id == null) {
            return null;
        }
        AssessmentSchedule assessmentSchedule = new AssessmentSchedule();
        assessmentSchedule.setId(id);
        return assessmentSchedule;
    }
}
