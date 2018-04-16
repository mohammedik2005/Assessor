package com.personal.assessor.service;

import com.personal.assessor.service.dto.ComplianceFlagDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing ComplianceFlag.
 */
public interface ComplianceFlagService {

    /**
     * Save a complianceFlag.
     *
     * @param complianceFlagDTO the entity to save
     * @return the persisted entity
     */
    ComplianceFlagDTO save(ComplianceFlagDTO complianceFlagDTO);

    /**
     * Get all the complianceFlags.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ComplianceFlagDTO> findAll(Pageable pageable);

    /**
     * Get the "id" complianceFlag.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ComplianceFlagDTO findOne(Long id);

    /**
     * Delete the "id" complianceFlag.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
