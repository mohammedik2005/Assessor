package com.personal.assessor.service;

import com.personal.assessor.service.dto.ControlCategoryDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing ControlCategory.
 */
public interface ControlCategoryService {

    /**
     * Save a controlCategory.
     *
     * @param controlCategoryDTO the entity to save
     * @return the persisted entity
     */
    ControlCategoryDTO save(ControlCategoryDTO controlCategoryDTO);

    /**
     * Get all the controlCategories.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ControlCategoryDTO> findAll(Pageable pageable);

    /**
     * Get the "id" controlCategory.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ControlCategoryDTO findOne(Long id);

    /**
     * Delete the "id" controlCategory.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
