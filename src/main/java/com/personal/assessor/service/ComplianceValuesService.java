package com.personal.assessor.service;

import com.personal.assessor.service.dto.ComplianceValuesDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing ComplianceValues.
 */
public interface ComplianceValuesService {

    /**
     * Save a complianceValues.
     *
     * @param complianceValuesDTO the entity to save
     * @return the persisted entity
     */
    ComplianceValuesDTO save(ComplianceValuesDTO complianceValuesDTO);

    /**
     * Get all the complianceValues.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ComplianceValuesDTO> findAll(Pageable pageable);

    /**
     * Get the "id" complianceValues.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ComplianceValuesDTO findOne(Long id);

    /**
     * Delete the "id" complianceValues.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
