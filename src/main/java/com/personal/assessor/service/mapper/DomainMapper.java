package com.personal.assessor.service.mapper;

import com.personal.assessor.domain.*;
import com.personal.assessor.service.dto.DomainDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Domain and its DTO DomainDTO.
 */
@Mapper(componentModel = "spring", uses = {AttachmentMapper.class, PrinciplesMapper.class, ControlMapper.class})
public interface DomainMapper extends EntityMapper<DomainDTO, Domain> {

    @Mapping(source = "principle.id", target = "principleId")
    @Mapping(source = "control.id", target = "controlId")
    DomainDTO toDto(Domain domain);

    @Mapping(source = "principleId", target = "principle")
    @Mapping(source = "controlId", target = "control")
    Domain toEntity(DomainDTO domainDTO);

    default Domain fromId(Long id) {
        if (id == null) {
            return null;
        }
        Domain domain = new Domain();
        domain.setId(id);
        return domain;
    }
}
