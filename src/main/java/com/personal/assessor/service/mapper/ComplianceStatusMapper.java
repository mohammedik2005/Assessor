package com.personal.assessor.service.mapper;

import com.personal.assessor.domain.*;
import com.personal.assessor.service.dto.ComplianceStatusDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ComplianceStatus and its DTO ComplianceStatusDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ComplianceStatusMapper extends EntityMapper<ComplianceStatusDTO, ComplianceStatus> {


    @Mapping(target = "values", ignore = true)
    ComplianceStatus toEntity(ComplianceStatusDTO complianceStatusDTO);

    default ComplianceStatus fromId(Long id) {
        if (id == null) {
            return null;
        }
        ComplianceStatus complianceStatus = new ComplianceStatus();
        complianceStatus.setId(id);
        return complianceStatus;
    }
}
