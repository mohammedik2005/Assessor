package com.personal.assessor.service.mapper;

import com.personal.assessor.domain.*;
import com.personal.assessor.service.dto.ControlDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Control and its DTO ControlDTO.
 */
@Mapper(componentModel = "spring", uses = {AttachmentMapper.class, ControlPriorityMapper.class})
public interface ControlMapper extends EntityMapper<ControlDTO, Control> {

    @Mapping(source = "priority.id", target = "priorityId")
    ControlDTO toDto(Control control);

    @Mapping(target = "domains", ignore = true)
    @Mapping(target = "compliances", ignore = true)
    @Mapping(source = "priorityId", target = "priority")
    @Mapping(target = "categories", ignore = true)
    Control toEntity(ControlDTO controlDTO);

    default Control fromId(Long id) {
        if (id == null) {
            return null;
        }
        Control control = new Control();
        control.setId(id);
        return control;
    }
}
