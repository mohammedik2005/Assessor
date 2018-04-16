package com.personal.assessor.service.mapper;

import com.personal.assessor.domain.*;
import com.personal.assessor.service.dto.ComplianceScheduleDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ComplianceSchedule and its DTO ComplianceScheduleDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ComplianceScheduleMapper extends EntityMapper<ComplianceScheduleDTO, ComplianceSchedule> {


    @Mapping(target = "values", ignore = true)
    @Mapping(target = "assessments", ignore = true)
    ComplianceSchedule toEntity(ComplianceScheduleDTO complianceScheduleDTO);

    default ComplianceSchedule fromId(Long id) {
        if (id == null) {
            return null;
        }
        ComplianceSchedule complianceSchedule = new ComplianceSchedule();
        complianceSchedule.setId(id);
        return complianceSchedule;
    }
}
