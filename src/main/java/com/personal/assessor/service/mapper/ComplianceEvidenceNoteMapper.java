package com.personal.assessor.service.mapper;

import com.personal.assessor.domain.*;
import com.personal.assessor.service.dto.ComplianceEvidenceNoteDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ComplianceEvidenceNote and its DTO ComplianceEvidenceNoteDTO.
 */
@Mapper(componentModel = "spring", uses = {ComplianceValuesMapper.class})
public interface ComplianceEvidenceNoteMapper extends EntityMapper<ComplianceEvidenceNoteDTO, ComplianceEvidenceNote> {



    default ComplianceEvidenceNote fromId(Long id) {
        if (id == null) {
            return null;
        }
        ComplianceEvidenceNote complianceEvidenceNote = new ComplianceEvidenceNote();
        complianceEvidenceNote.setId(id);
        return complianceEvidenceNote;
    }
}
