package com.personal.assessor.service.impl;

import com.personal.assessor.service.ControlPriorityService;
import com.personal.assessor.domain.ControlPriority;
import com.personal.assessor.repository.ControlPriorityRepository;
import com.personal.assessor.service.dto.ControlPriorityDTO;
import com.personal.assessor.service.mapper.ControlPriorityMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing ControlPriority.
 */
@Service
@Transactional
public class ControlPriorityServiceImpl implements ControlPriorityService {

    private final Logger log = LoggerFactory.getLogger(ControlPriorityServiceImpl.class);

    private final ControlPriorityRepository controlPriorityRepository;

    private final ControlPriorityMapper controlPriorityMapper;

    public ControlPriorityServiceImpl(ControlPriorityRepository controlPriorityRepository, ControlPriorityMapper controlPriorityMapper) {
        this.controlPriorityRepository = controlPriorityRepository;
        this.controlPriorityMapper = controlPriorityMapper;
    }

    /**
     * Save a controlPriority.
     *
     * @param controlPriorityDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ControlPriorityDTO save(ControlPriorityDTO controlPriorityDTO) {
        log.debug("Request to save ControlPriority : {}", controlPriorityDTO);
        ControlPriority controlPriority = controlPriorityMapper.toEntity(controlPriorityDTO);
        controlPriority = controlPriorityRepository.save(controlPriority);
        return controlPriorityMapper.toDto(controlPriority);
    }

    /**
     * Get all the controlPriorities.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ControlPriorityDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ControlPriorities");
        return controlPriorityRepository.findAll(pageable)
            .map(controlPriorityMapper::toDto);
    }

    /**
     * Get one controlPriority by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ControlPriorityDTO findOne(Long id) {
        log.debug("Request to get ControlPriority : {}", id);
        ControlPriority controlPriority = controlPriorityRepository.findOne(id);
        return controlPriorityMapper.toDto(controlPriority);
    }

    /**
     * Delete the controlPriority by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ControlPriority : {}", id);
        controlPriorityRepository.delete(id);
    }
}
