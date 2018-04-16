package com.personal.assessor.service.mapper;

import com.personal.assessor.domain.*;
import com.personal.assessor.service.dto.ComplianceFlagDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ComplianceFlag and its DTO ComplianceFlagDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ComplianceFlagMapper extends EntityMapper<ComplianceFlagDTO, ComplianceFlag> {


    @Mapping(target = "compliances", ignore = true)
    ComplianceFlag toEntity(ComplianceFlagDTO complianceFlagDTO);

    default ComplianceFlag fromId(Long id) {
        if (id == null) {
            return null;
        }
        ComplianceFlag complianceFlag = new ComplianceFlag();
        complianceFlag.setId(id);
        return complianceFlag;
    }
}
