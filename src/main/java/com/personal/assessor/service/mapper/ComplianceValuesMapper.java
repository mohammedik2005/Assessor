package com.personal.assessor.service.mapper;

import com.personal.assessor.domain.*;
import com.personal.assessor.service.dto.ComplianceValuesDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ComplianceValues and its DTO ComplianceValuesDTO.
 */
@Mapper(componentModel = "spring", uses = {AttachmentMapper.class, ComplianceStatusMapper.class, ComplianceScheduleMapper.class, ComplianceEvidenceTypeMapper.class, ComplianceEvidenceStatusMapper.class})
public interface ComplianceValuesMapper extends EntityMapper<ComplianceValuesDTO, ComplianceValues> {

    @Mapping(source = "complianceStatus.id", target = "complianceStatusId")
    @Mapping(source = "complianceSchedule.id", target = "complianceScheduleId")
    @Mapping(source = "evidenceType.id", target = "evidenceTypeId")
    @Mapping(source = "evidenceStatus.id", target = "evidenceStatusId")
    ComplianceValuesDTO toDto(ComplianceValues complianceValues);

    @Mapping(source = "complianceStatusId", target = "complianceStatus")
    @Mapping(source = "complianceScheduleId", target = "complianceSchedule")
    @Mapping(source = "evidenceTypeId", target = "evidenceType")
    @Mapping(source = "evidenceStatusId", target = "evidenceStatus")
    @Mapping(target = "applicants", ignore = true)
    @Mapping(target = "compliances", ignore = true)
    @Mapping(target = "notes", ignore = true)
    ComplianceValues toEntity(ComplianceValuesDTO complianceValuesDTO);

    default ComplianceValues fromId(Long id) {
        if (id == null) {
            return null;
        }
        ComplianceValues complianceValues = new ComplianceValues();
        complianceValues.setId(id);
        return complianceValues;
    }
}
