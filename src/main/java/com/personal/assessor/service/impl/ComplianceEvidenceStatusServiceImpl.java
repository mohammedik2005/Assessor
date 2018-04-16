package com.personal.assessor.service.impl;

import com.personal.assessor.service.ComplianceEvidenceStatusService;
import com.personal.assessor.domain.ComplianceEvidenceStatus;
import com.personal.assessor.repository.ComplianceEvidenceStatusRepository;
import com.personal.assessor.service.dto.ComplianceEvidenceStatusDTO;
import com.personal.assessor.service.mapper.ComplianceEvidenceStatusMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing ComplianceEvidenceStatus.
 */
@Service
@Transactional
public class ComplianceEvidenceStatusServiceImpl implements ComplianceEvidenceStatusService {

    private final Logger log = LoggerFactory.getLogger(ComplianceEvidenceStatusServiceImpl.class);

    private final ComplianceEvidenceStatusRepository complianceEvidenceStatusRepository;

    private final ComplianceEvidenceStatusMapper complianceEvidenceStatusMapper;

    public ComplianceEvidenceStatusServiceImpl(ComplianceEvidenceStatusRepository complianceEvidenceStatusRepository, ComplianceEvidenceStatusMapper complianceEvidenceStatusMapper) {
        this.complianceEvidenceStatusRepository = complianceEvidenceStatusRepository;
        this.complianceEvidenceStatusMapper = complianceEvidenceStatusMapper;
    }

    /**
     * Save a complianceEvidenceStatus.
     *
     * @param complianceEvidenceStatusDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ComplianceEvidenceStatusDTO save(ComplianceEvidenceStatusDTO complianceEvidenceStatusDTO) {
        log.debug("Request to save ComplianceEvidenceStatus : {}", complianceEvidenceStatusDTO);
        ComplianceEvidenceStatus complianceEvidenceStatus = complianceEvidenceStatusMapper.toEntity(complianceEvidenceStatusDTO);
        complianceEvidenceStatus = complianceEvidenceStatusRepository.save(complianceEvidenceStatus);
        return complianceEvidenceStatusMapper.toDto(complianceEvidenceStatus);
    }

    /**
     * Get all the complianceEvidenceStatuses.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ComplianceEvidenceStatusDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ComplianceEvidenceStatuses");
        return complianceEvidenceStatusRepository.findAll(pageable)
            .map(complianceEvidenceStatusMapper::toDto);
    }

    /**
     * Get one complianceEvidenceStatus by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ComplianceEvidenceStatusDTO findOne(Long id) {
        log.debug("Request to get ComplianceEvidenceStatus : {}", id);
        ComplianceEvidenceStatus complianceEvidenceStatus = complianceEvidenceStatusRepository.findOne(id);
        return complianceEvidenceStatusMapper.toDto(complianceEvidenceStatus);
    }

    /**
     * Delete the complianceEvidenceStatus by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ComplianceEvidenceStatus : {}", id);
        complianceEvidenceStatusRepository.delete(id);
    }
}
