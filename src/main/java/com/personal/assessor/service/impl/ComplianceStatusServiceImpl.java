package com.personal.assessor.service.impl;

import com.personal.assessor.service.ComplianceStatusService;
import com.personal.assessor.domain.ComplianceStatus;
import com.personal.assessor.repository.ComplianceStatusRepository;
import com.personal.assessor.service.dto.ComplianceStatusDTO;
import com.personal.assessor.service.mapper.ComplianceStatusMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing ComplianceStatus.
 */
@Service
@Transactional
public class ComplianceStatusServiceImpl implements ComplianceStatusService {

    private final Logger log = LoggerFactory.getLogger(ComplianceStatusServiceImpl.class);

    private final ComplianceStatusRepository complianceStatusRepository;

    private final ComplianceStatusMapper complianceStatusMapper;

    public ComplianceStatusServiceImpl(ComplianceStatusRepository complianceStatusRepository, ComplianceStatusMapper complianceStatusMapper) {
        this.complianceStatusRepository = complianceStatusRepository;
        this.complianceStatusMapper = complianceStatusMapper;
    }

    /**
     * Save a complianceStatus.
     *
     * @param complianceStatusDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ComplianceStatusDTO save(ComplianceStatusDTO complianceStatusDTO) {
        log.debug("Request to save ComplianceStatus : {}", complianceStatusDTO);
        ComplianceStatus complianceStatus = complianceStatusMapper.toEntity(complianceStatusDTO);
        complianceStatus = complianceStatusRepository.save(complianceStatus);
        return complianceStatusMapper.toDto(complianceStatus);
    }

    /**
     * Get all the complianceStatuses.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ComplianceStatusDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ComplianceStatuses");
        return complianceStatusRepository.findAll(pageable)
            .map(complianceStatusMapper::toDto);
    }

    /**
     * Get one complianceStatus by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ComplianceStatusDTO findOne(Long id) {
        log.debug("Request to get ComplianceStatus : {}", id);
        ComplianceStatus complianceStatus = complianceStatusRepository.findOne(id);
        return complianceStatusMapper.toDto(complianceStatus);
    }

    /**
     * Delete the complianceStatus by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ComplianceStatus : {}", id);
        complianceStatusRepository.delete(id);
    }
}
