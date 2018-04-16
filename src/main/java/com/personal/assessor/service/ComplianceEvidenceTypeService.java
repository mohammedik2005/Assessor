package com.personal.assessor.service;

import com.personal.assessor.service.dto.ComplianceEvidenceTypeDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing ComplianceEvidenceType.
 */
public interface ComplianceEvidenceTypeService {

    /**
     * Save a complianceEvidenceType.
     *
     * @param complianceEvidenceTypeDTO the entity to save
     * @return the persisted entity
     */
    ComplianceEvidenceTypeDTO save(ComplianceEvidenceTypeDTO complianceEvidenceTypeDTO);

    /**
     * Get all the complianceEvidenceTypes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ComplianceEvidenceTypeDTO> findAll(Pageable pageable);

    /**
     * Get the "id" complianceEvidenceType.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ComplianceEvidenceTypeDTO findOne(Long id);

    /**
     * Delete the "id" complianceEvidenceType.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
