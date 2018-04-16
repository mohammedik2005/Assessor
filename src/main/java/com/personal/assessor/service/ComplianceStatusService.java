package com.personal.assessor.service;

import com.personal.assessor.service.dto.ComplianceStatusDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing ComplianceStatus.
 */
public interface ComplianceStatusService {

    /**
     * Save a complianceStatus.
     *
     * @param complianceStatusDTO the entity to save
     * @return the persisted entity
     */
    ComplianceStatusDTO save(ComplianceStatusDTO complianceStatusDTO);

    /**
     * Get all the complianceStatuses.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ComplianceStatusDTO> findAll(Pageable pageable);

    /**
     * Get the "id" complianceStatus.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ComplianceStatusDTO findOne(Long id);

    /**
     * Delete the "id" complianceStatus.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
