package com.personal.assessor.service;

import com.personal.assessor.service.dto.AssessmentScheduleDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing AssessmentSchedule.
 */
public interface AssessmentScheduleService {

    /**
     * Save a assessmentSchedule.
     *
     * @param assessmentScheduleDTO the entity to save
     * @return the persisted entity
     */
    AssessmentScheduleDTO save(AssessmentScheduleDTO assessmentScheduleDTO);

    /**
     * Get all the assessmentSchedules.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<AssessmentScheduleDTO> findAll(Pageable pageable);

    /**
     * Get the "id" assessmentSchedule.
     *
     * @param id the id of the entity
     * @return the entity
     */
    AssessmentScheduleDTO findOne(Long id);

    /**
     * Delete the "id" assessmentSchedule.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
