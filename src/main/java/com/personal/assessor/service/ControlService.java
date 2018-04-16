package com.personal.assessor.service;

import com.personal.assessor.service.dto.ControlDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Control.
 */
public interface ControlService {

    /**
     * Save a control.
     *
     * @param controlDTO the entity to save
     * @return the persisted entity
     */
    ControlDTO save(ControlDTO controlDTO);

    /**
     * Get all the controls.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ControlDTO> findAll(Pageable pageable);

    /**
     * Get the "id" control.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ControlDTO findOne(Long id);

    /**
     * Delete the "id" control.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
