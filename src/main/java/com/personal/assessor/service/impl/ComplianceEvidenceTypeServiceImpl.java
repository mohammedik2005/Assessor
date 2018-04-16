package com.personal.assessor.service.impl;

import com.personal.assessor.service.ComplianceEvidenceTypeService;
import com.personal.assessor.domain.ComplianceEvidenceType;
import com.personal.assessor.repository.ComplianceEvidenceTypeRepository;
import com.personal.assessor.service.dto.ComplianceEvidenceTypeDTO;
import com.personal.assessor.service.mapper.ComplianceEvidenceTypeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing ComplianceEvidenceType.
 */
@Service
@Transactional
public class ComplianceEvidenceTypeServiceImpl implements ComplianceEvidenceTypeService {

    private final Logger log = LoggerFactory.getLogger(ComplianceEvidenceTypeServiceImpl.class);

    private final ComplianceEvidenceTypeRepository complianceEvidenceTypeRepository;

    private final ComplianceEvidenceTypeMapper complianceEvidenceTypeMapper;

    public ComplianceEvidenceTypeServiceImpl(ComplianceEvidenceTypeRepository complianceEvidenceTypeRepository, ComplianceEvidenceTypeMapper complianceEvidenceTypeMapper) {
        this.complianceEvidenceTypeRepository = complianceEvidenceTypeRepository;
        this.complianceEvidenceTypeMapper = complianceEvidenceTypeMapper;
    }

    /**
     * Save a complianceEvidenceType.
     *
     * @param complianceEvidenceTypeDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ComplianceEvidenceTypeDTO save(ComplianceEvidenceTypeDTO complianceEvidenceTypeDTO) {
        log.debug("Request to save ComplianceEvidenceType : {}", complianceEvidenceTypeDTO);
        ComplianceEvidenceType complianceEvidenceType = complianceEvidenceTypeMapper.toEntity(complianceEvidenceTypeDTO);
        complianceEvidenceType = complianceEvidenceTypeRepository.save(complianceEvidenceType);
        return complianceEvidenceTypeMapper.toDto(complianceEvidenceType);
    }

    /**
     * Get all the complianceEvidenceTypes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ComplianceEvidenceTypeDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ComplianceEvidenceTypes");
        return complianceEvidenceTypeRepository.findAll(pageable)
            .map(complianceEvidenceTypeMapper::toDto);
    }

    /**
     * Get one complianceEvidenceType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ComplianceEvidenceTypeDTO findOne(Long id) {
        log.debug("Request to get ComplianceEvidenceType : {}", id);
        ComplianceEvidenceType complianceEvidenceType = complianceEvidenceTypeRepository.findOne(id);
        return complianceEvidenceTypeMapper.toDto(complianceEvidenceType);
    }

    /**
     * Delete the complianceEvidenceType by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ComplianceEvidenceType : {}", id);
        complianceEvidenceTypeRepository.delete(id);
    }
}
