package com.personal.assessor.service;

import com.personal.assessor.service.dto.ComplianceEvidenceNoteDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing ComplianceEvidenceNote.
 */
public interface ComplianceEvidenceNoteService {

    /**
     * Save a complianceEvidenceNote.
     *
     * @param complianceEvidenceNoteDTO the entity to save
     * @return the persisted entity
     */
    ComplianceEvidenceNoteDTO save(ComplianceEvidenceNoteDTO complianceEvidenceNoteDTO);

    /**
     * Get all the complianceEvidenceNotes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ComplianceEvidenceNoteDTO> findAll(Pageable pageable);

    /**
     * Get the "id" complianceEvidenceNote.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ComplianceEvidenceNoteDTO findOne(Long id);

    /**
     * Delete the "id" complianceEvidenceNote.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
