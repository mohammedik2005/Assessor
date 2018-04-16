package com.personal.assessor.service.mapper;

import com.personal.assessor.domain.*;
import com.personal.assessor.service.dto.ApplicantDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Applicant and its DTO ApplicantDTO.
 */
@Mapper(componentModel = "spring", uses = {ComplianceValuesMapper.class})
public interface ApplicantMapper extends EntityMapper<ApplicantDTO, Applicant> {



    default Applicant fromId(Long id) {
        if (id == null) {
            return null;
        }
        Applicant applicant = new Applicant();
        applicant.setId(id);
        return applicant;
    }
}
