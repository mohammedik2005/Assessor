package com.personal.assessor.service.impl;

import com.personal.assessor.service.ComplianceValuesService;
import com.personal.assessor.domain.ComplianceValues;
import com.personal.assessor.repository.ComplianceValuesRepository;
import com.personal.assessor.service.dto.ComplianceValuesDTO;
import com.personal.assessor.service.mapper.ComplianceValuesMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing ComplianceValues.
 */
@Service
@Transactional
public class ComplianceValuesServiceImpl implements ComplianceValuesService {

    private final Logger log = LoggerFactory.getLogger(ComplianceValuesServiceImpl.class);

    private final ComplianceValuesRepository complianceValuesRepository;

    private final ComplianceValuesMapper complianceValuesMapper;

    public ComplianceValuesServiceImpl(ComplianceValuesRepository complianceValuesRepository, ComplianceValuesMapper complianceValuesMapper) {
        this.complianceValuesRepository = complianceValuesRepository;
        this.complianceValuesMapper = complianceValuesMapper;
    }

    /**
     * Save a complianceValues.
     *
     * @param complianceValuesDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ComplianceValuesDTO save(ComplianceValuesDTO complianceValuesDTO) {
        log.debug("Request to save ComplianceValues : {}", complianceValuesDTO);
        ComplianceValues complianceValues = complianceValuesMapper.toEntity(complianceValuesDTO);
        complianceValues = complianceValuesRepository.save(complianceValues);
        return complianceValuesMapper.toDto(complianceValues);
    }

    /**
     * Get all the complianceValues.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ComplianceValuesDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ComplianceValues");
        return complianceValuesRepository.findAll(pageable)
            .map(complianceValuesMapper::toDto);
    }

    /**
     * Get one complianceValues by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ComplianceValuesDTO findOne(Long id) {
        log.debug("Request to get ComplianceValues : {}", id);
        ComplianceValues complianceValues = complianceValuesRepository.findOneWithEagerRelationships(id);
        return complianceValuesMapper.toDto(complianceValues);
    }

    /**
     * Delete the complianceValues by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ComplianceValues : {}", id);
        complianceValuesRepository.delete(id);
    }
}
