package com.personal.assessor.service;

import com.personal.assessor.service.dto.ComplianceDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Compliance.
 */
public interface ComplianceService {

    /**
     * Save a compliance.
     *
     * @param complianceDTO the entity to save
     * @return the persisted entity
     */
    ComplianceDTO save(ComplianceDTO complianceDTO);

    /**
     * Get all the compliances.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ComplianceDTO> findAll(Pageable pageable);

    /**
     * Get the "id" compliance.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ComplianceDTO findOne(Long id);

    /**
     * Delete the "id" compliance.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
