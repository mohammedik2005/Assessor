package com.personal.assessor.service;

import com.personal.assessor.service.dto.ComplianceScheduleDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing ComplianceSchedule.
 */
public interface ComplianceScheduleService {

    /**
     * Save a complianceSchedule.
     *
     * @param complianceScheduleDTO the entity to save
     * @return the persisted entity
     */
    ComplianceScheduleDTO save(ComplianceScheduleDTO complianceScheduleDTO);

    /**
     * Get all the complianceSchedules.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ComplianceScheduleDTO> findAll(Pageable pageable);

    /**
     * Get the "id" complianceSchedule.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ComplianceScheduleDTO findOne(Long id);

    /**
     * Delete the "id" complianceSchedule.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
