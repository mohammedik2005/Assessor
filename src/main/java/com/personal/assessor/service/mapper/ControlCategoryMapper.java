package com.personal.assessor.service.mapper;

import com.personal.assessor.domain.*;
import com.personal.assessor.service.dto.ControlCategoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ControlCategory and its DTO ControlCategoryDTO.
 */
@Mapper(componentModel = "spring", uses = {ControlMapper.class})
public interface ControlCategoryMapper extends EntityMapper<ControlCategoryDTO, ControlCategory> {



    default ControlCategory fromId(Long id) {
        if (id == null) {
            return null;
        }
        ControlCategory controlCategory = new ControlCategory();
        controlCategory.setId(id);
        return controlCategory;
    }
}
