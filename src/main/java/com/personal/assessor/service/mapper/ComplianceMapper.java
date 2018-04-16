package com.personal.assessor.service.mapper;

import com.personal.assessor.domain.*;
import com.personal.assessor.service.dto.ComplianceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Compliance and its DTO ComplianceDTO.
 */
@Mapper(componentModel = "spring", uses = {ComplianceValuesMapper.class, ControlMapper.class, ComplianceFlagMapper.class})
public interface ComplianceMapper extends EntityMapper<ComplianceDTO, Compliance> {

    @Mapping(source = "control.id", target = "controlId")
    @Mapping(source = "complianceFlag.id", target = "complianceFlagId")
    ComplianceDTO toDto(Compliance compliance);

    @Mapping(source = "controlId", target = "control")
    @Mapping(source = "complianceFlagId", target = "complianceFlag")
    Compliance toEntity(ComplianceDTO complianceDTO);

    default Compliance fromId(Long id) {
        if (id == null) {
            return null;
        }
        Compliance compliance = new Compliance();
        compliance.setId(id);
        return compliance;
    }
}
