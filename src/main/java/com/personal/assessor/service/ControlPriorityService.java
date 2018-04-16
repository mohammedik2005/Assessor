package com.personal.assessor.service;

import com.personal.assessor.service.dto.ControlPriorityDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing ControlPriority.
 */
public interface ControlPriorityService {

    /**
     * Save a controlPriority.
     *
     * @param controlPriorityDTO the entity to save
     * @return the persisted entity
     */
    ControlPriorityDTO save(ControlPriorityDTO controlPriorityDTO);

    /**
     * Get all the controlPriorities.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ControlPriorityDTO> findAll(Pageable pageable);

    /**
     * Get the "id" controlPriority.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ControlPriorityDTO findOne(Long id);

    /**
     * Delete the "id" controlPriority.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
