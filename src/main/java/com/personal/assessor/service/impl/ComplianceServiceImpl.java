package com.personal.assessor.service.impl;

import com.personal.assessor.service.ComplianceService;
import com.personal.assessor.domain.Compliance;
import com.personal.assessor.repository.ComplianceRepository;
import com.personal.assessor.service.dto.ComplianceDTO;
import com.personal.assessor.service.mapper.ComplianceMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Compliance.
 */
@Service
@Transactional
public class ComplianceServiceImpl implements ComplianceService {

    private final Logger log = LoggerFactory.getLogger(ComplianceServiceImpl.class);

    private final ComplianceRepository complianceRepository;

    private final ComplianceMapper complianceMapper;

    public ComplianceServiceImpl(ComplianceRepository complianceRepository, ComplianceMapper complianceMapper) {
        this.complianceRepository = complianceRepository;
        this.complianceMapper = complianceMapper;
    }

    /**
     * Save a compliance.
     *
     * @param complianceDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ComplianceDTO save(ComplianceDTO complianceDTO) {
        log.debug("Request to save Compliance : {}", complianceDTO);
        Compliance compliance = complianceMapper.toEntity(complianceDTO);
        compliance = complianceRepository.save(compliance);
        return complianceMapper.toDto(compliance);
    }

    /**
     * Get all the compliances.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ComplianceDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Compliances");
        return complianceRepository.findAll(pageable)
            .map(complianceMapper::toDto);
    }

    /**
     * Get one compliance by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ComplianceDTO findOne(Long id) {
        log.debug("Request to get Compliance : {}", id);
        Compliance compliance = complianceRepository.findOneWithEagerRelationships(id);
        return complianceMapper.toDto(compliance);
    }

    /**
     * Delete the compliance by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Compliance : {}", id);
        complianceRepository.delete(id);
    }
}
