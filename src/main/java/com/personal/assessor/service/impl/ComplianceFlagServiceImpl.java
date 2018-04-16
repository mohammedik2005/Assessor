package com.personal.assessor.service.impl;

import com.personal.assessor.service.ComplianceFlagService;
import com.personal.assessor.domain.ComplianceFlag;
import com.personal.assessor.repository.ComplianceFlagRepository;
import com.personal.assessor.service.dto.ComplianceFlagDTO;
import com.personal.assessor.service.mapper.ComplianceFlagMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing ComplianceFlag.
 */
@Service
@Transactional
public class ComplianceFlagServiceImpl implements ComplianceFlagService {

    private final Logger log = LoggerFactory.getLogger(ComplianceFlagServiceImpl.class);

    private final ComplianceFlagRepository complianceFlagRepository;

    private final ComplianceFlagMapper complianceFlagMapper;

    public ComplianceFlagServiceImpl(ComplianceFlagRepository complianceFlagRepository, ComplianceFlagMapper complianceFlagMapper) {
        this.complianceFlagRepository = complianceFlagRepository;
        this.complianceFlagMapper = complianceFlagMapper;
    }

    /**
     * Save a complianceFlag.
     *
     * @param complianceFlagDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ComplianceFlagDTO save(ComplianceFlagDTO complianceFlagDTO) {
        log.debug("Request to save ComplianceFlag : {}", complianceFlagDTO);
        ComplianceFlag complianceFlag = complianceFlagMapper.toEntity(complianceFlagDTO);
        complianceFlag = complianceFlagRepository.save(complianceFlag);
        return complianceFlagMapper.toDto(complianceFlag);
    }

    /**
     * Get all the complianceFlags.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ComplianceFlagDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ComplianceFlags");
        return complianceFlagRepository.findAll(pageable)
            .map(complianceFlagMapper::toDto);
    }

    /**
     * Get one complianceFlag by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ComplianceFlagDTO findOne(Long id) {
        log.debug("Request to get ComplianceFlag : {}", id);
        ComplianceFlag complianceFlag = complianceFlagRepository.findOne(id);
        return complianceFlagMapper.toDto(complianceFlag);
    }

    /**
     * Delete the complianceFlag by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ComplianceFlag : {}", id);
        complianceFlagRepository.delete(id);
    }
}
