package com.personal.assessor.service.impl;

import com.personal.assessor.service.ControlService;
import com.personal.assessor.domain.Control;
import com.personal.assessor.repository.ControlRepository;
import com.personal.assessor.service.dto.ControlDTO;
import com.personal.assessor.service.mapper.ControlMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Control.
 */
@Service
@Transactional
public class ControlServiceImpl implements ControlService {

    private final Logger log = LoggerFactory.getLogger(ControlServiceImpl.class);

    private final ControlRepository controlRepository;

    private final ControlMapper controlMapper;

    public ControlServiceImpl(ControlRepository controlRepository, ControlMapper controlMapper) {
        this.controlRepository = controlRepository;
        this.controlMapper = controlMapper;
    }

    /**
     * Save a control.
     *
     * @param controlDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ControlDTO save(ControlDTO controlDTO) {
        log.debug("Request to save Control : {}", controlDTO);
        Control control = controlMapper.toEntity(controlDTO);
        control = controlRepository.save(control);
        return controlMapper.toDto(control);
    }

    /**
     * Get all the controls.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ControlDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Controls");
        return controlRepository.findAll(pageable)
            .map(controlMapper::toDto);
    }

    /**
     * Get one control by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ControlDTO findOne(Long id) {
        log.debug("Request to get Control : {}", id);
        Control control = controlRepository.findOneWithEagerRelationships(id);
        return controlMapper.toDto(control);
    }

    /**
     * Delete the control by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Control : {}", id);
        controlRepository.delete(id);
    }
}
