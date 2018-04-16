package com.personal.assessor.service.mapper;

import com.personal.assessor.domain.*;
import com.personal.assessor.service.dto.PrinciplesDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Principles and its DTO PrinciplesDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PrinciplesMapper extends EntityMapper<PrinciplesDTO, Principles> {


    @Mapping(target = "domains", ignore = true)
    Principles toEntity(PrinciplesDTO principlesDTO);

    default Principles fromId(Long id) {
        if (id == null) {
            return null;
        }
        Principles principles = new Principles();
        principles.setId(id);
        return principles;
    }
}
