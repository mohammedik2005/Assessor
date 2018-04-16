package com.personal.assessor.service.mapper;

import com.personal.assessor.domain.*;
import com.personal.assessor.service.dto.ComplianceEvidenceStatusDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ComplianceEvidenceStatus and its DTO ComplianceEvidenceStatusDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ComplianceEvidenceStatusMapper extends EntityMapper<ComplianceEvidenceStatusDTO, ComplianceEvidenceStatus> {


    @Mapping(target = "values", ignore = true)
    ComplianceEvidenceStatus toEntity(ComplianceEvidenceStatusDTO complianceEvidenceStatusDTO);

    default ComplianceEvidenceStatus fromId(Long id) {
        if (id == null) {
            return null;
        }
        ComplianceEvidenceStatus complianceEvidenceStatus = new ComplianceEvidenceStatus();
        complianceEvidenceStatus.setId(id);
        return complianceEvidenceStatus;
    }
}
