package com.personal.assessor.service;

import com.personal.assessor.service.dto.PrinciplesDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Principles.
 */
public interface PrinciplesService {

    /**
     * Save a principles.
     *
     * @param principlesDTO the entity to save
     * @return the persisted entity
     */
    PrinciplesDTO save(PrinciplesDTO principlesDTO);

    /**
     * Get all the principles.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<PrinciplesDTO> findAll(Pageable pageable);

    /**
     * Get the "id" principles.
     *
     * @param id the id of the entity
     * @return the entity
     */
    PrinciplesDTO findOne(Long id);

    /**
     * Delete the "id" principles.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
