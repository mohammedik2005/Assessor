package com.personal.assessor.service;

import com.personal.assessor.service.dto.ComplianceEvidenceStatusDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing ComplianceEvidenceStatus.
 */
public interface ComplianceEvidenceStatusService {

    /**
     * Save a complianceEvidenceStatus.
     *
     * @param complianceEvidenceStatusDTO the entity to save
     * @return the persisted entity
     */
    ComplianceEvidenceStatusDTO save(ComplianceEvidenceStatusDTO complianceEvidenceStatusDTO);

    /**
     * Get all the complianceEvidenceStatuses.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ComplianceEvidenceStatusDTO> findAll(Pageable pageable);

    /**
     * Get the "id" complianceEvidenceStatus.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ComplianceEvidenceStatusDTO findOne(Long id);

    /**
     * Delete the "id" complianceEvidenceStatus.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
