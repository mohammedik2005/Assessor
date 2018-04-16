package com.personal.assessor.service.mapper;

import com.personal.assessor.domain.*;
import com.personal.assessor.service.dto.ComplianceEvidenceTypeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ComplianceEvidenceType and its DTO ComplianceEvidenceTypeDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ComplianceEvidenceTypeMapper extends EntityMapper<ComplianceEvidenceTypeDTO, ComplianceEvidenceType> {


    @Mapping(target = "values", ignore = true)
    ComplianceEvidenceType toEntity(ComplianceEvidenceTypeDTO complianceEvidenceTypeDTO);

    default ComplianceEvidenceType fromId(Long id) {
        if (id == null) {
            return null;
        }
        ComplianceEvidenceType complianceEvidenceType = new ComplianceEvidenceType();
        complianceEvidenceType.setId(id);
        return complianceEvidenceType;
    }
}
