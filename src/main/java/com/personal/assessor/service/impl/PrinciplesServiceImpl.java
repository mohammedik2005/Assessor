package com.personal.assessor.service.impl;

import com.personal.assessor.service.PrinciplesService;
import com.personal.assessor.domain.Principles;
import com.personal.assessor.repository.PrinciplesRepository;
import com.personal.assessor.service.dto.PrinciplesDTO;
import com.personal.assessor.service.mapper.PrinciplesMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Principles.
 */
@Service
@Transactional
public class PrinciplesServiceImpl implements PrinciplesService {

    private final Logger log = LoggerFactory.getLogger(PrinciplesServiceImpl.class);

    private final PrinciplesRepository principlesRepository;

    private final PrinciplesMapper principlesMapper;

    public PrinciplesServiceImpl(PrinciplesRepository principlesRepository, PrinciplesMapper principlesMapper) {
        this.principlesRepository = principlesRepository;
        this.principlesMapper = principlesMapper;
    }

    /**
     * Save a principles.
     *
     * @param principlesDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PrinciplesDTO save(PrinciplesDTO principlesDTO) {
        log.debug("Request to save Principles : {}", principlesDTO);
        Principles principles = principlesMapper.toEntity(principlesDTO);
        principles = principlesRepository.save(principles);
        return principlesMapper.toDto(principles);
    }

    /**
     * Get all the principles.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PrinciplesDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Principles");
        return principlesRepository.findAll(pageable)
            .map(principlesMapper::toDto);
    }

    /**
     * Get one principles by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PrinciplesDTO findOne(Long id) {
        log.debug("Request to get Principles : {}", id);
        Principles principles = principlesRepository.findOne(id);
        return principlesMapper.toDto(principles);
    }

    /**
     * Delete the principles by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Principles : {}", id);
        principlesRepository.delete(id);
    }
}
