package com.personal.assessor.service.impl;

import com.personal.assessor.service.ControlCategoryService;
import com.personal.assessor.domain.ControlCategory;
import com.personal.assessor.repository.ControlCategoryRepository;
import com.personal.assessor.service.dto.ControlCategoryDTO;
import com.personal.assessor.service.mapper.ControlCategoryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing ControlCategory.
 */
@Service
@Transactional
public class ControlCategoryServiceImpl implements ControlCategoryService {

    private final Logger log = LoggerFactory.getLogger(ControlCategoryServiceImpl.class);

    private final ControlCategoryRepository controlCategoryRepository;

    private final ControlCategoryMapper controlCategoryMapper;

    public ControlCategoryServiceImpl(ControlCategoryRepository controlCategoryRepository, ControlCategoryMapper controlCategoryMapper) {
        this.controlCategoryRepository = controlCategoryRepository;
        this.controlCategoryMapper = controlCategoryMapper;
    }

    /**
     * Save a controlCategory.
     *
     * @param controlCategoryDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ControlCategoryDTO save(ControlCategoryDTO controlCategoryDTO) {
        log.debug("Request to save ControlCategory : {}", controlCategoryDTO);
        ControlCategory controlCategory = controlCategoryMapper.toEntity(controlCategoryDTO);
        controlCategory = controlCategoryRepository.save(controlCategory);
        return controlCategoryMapper.toDto(controlCategory);
    }

    /**
     * Get all the controlCategories.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ControlCategoryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ControlCategories");
        return controlCategoryRepository.findAll(pageable)
            .map(controlCategoryMapper::toDto);
    }

    /**
     * Get one controlCategory by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ControlCategoryDTO findOne(Long id) {
        log.debug("Request to get ControlCategory : {}", id);
        ControlCategory controlCategory = controlCategoryRepository.findOneWithEagerRelationships(id);
        return controlCategoryMapper.toDto(controlCategory);
    }

    /**
     * Delete the controlCategory by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ControlCategory : {}", id);
        controlCategoryRepository.delete(id);
    }
}
