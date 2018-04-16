package com.personal.assessor.service.mapper;

import com.personal.assessor.domain.*;
import com.personal.assessor.service.dto.ControlPriorityDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ControlPriority and its DTO ControlPriorityDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ControlPriorityMapper extends EntityMapper<ControlPriorityDTO, ControlPriority> {


    @Mapping(target = "controls", ignore = true)
    ControlPriority toEntity(ControlPriorityDTO controlPriorityDTO);

    default ControlPriority fromId(Long id) {
        if (id == null) {
            return null;
        }
        ControlPriority controlPriority = new ControlPriority();
        controlPriority.setId(id);
        return controlPriority;
    }
}
