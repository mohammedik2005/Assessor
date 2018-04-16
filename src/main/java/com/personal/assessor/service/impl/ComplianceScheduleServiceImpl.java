package com.personal.assessor.service.impl;

import com.personal.assessor.service.ComplianceScheduleService;
import com.personal.assessor.domain.ComplianceSchedule;
import com.personal.assessor.repository.ComplianceScheduleRepository;
import com.personal.assessor.service.dto.ComplianceScheduleDTO;
import com.personal.assessor.service.mapper.ComplianceScheduleMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing ComplianceSchedule.
 */
@Service
@Transactional
public class ComplianceScheduleServiceImpl implements ComplianceScheduleService {

    private final Logger log = LoggerFactory.getLogger(ComplianceScheduleServiceImpl.class);

    private final ComplianceScheduleRepository complianceScheduleRepository;

    private final ComplianceScheduleMapper complianceScheduleMapper;

    public ComplianceScheduleServiceImpl(ComplianceScheduleRepository complianceScheduleRepository, ComplianceScheduleMapper complianceScheduleMapper) {
        this.complianceScheduleRepository = complianceScheduleRepository;
        this.complianceScheduleMapper = complianceScheduleMapper;
    }

    /**
     * Save a complianceSchedule.
     *
     * @param complianceScheduleDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ComplianceScheduleDTO save(ComplianceScheduleDTO complianceScheduleDTO) {
        log.debug("Request to save ComplianceSchedule : {}", complianceScheduleDTO);
        ComplianceSchedule complianceSchedule = complianceScheduleMapper.toEntity(complianceScheduleDTO);
        complianceSchedule = complianceScheduleRepository.save(complianceSchedule);
        return complianceScheduleMapper.toDto(complianceSchedule);
    }

    /**
     * Get all the complianceSchedules.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ComplianceScheduleDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ComplianceSchedules");
        return complianceScheduleRepository.findAll(pageable)
            .map(complianceScheduleMapper::toDto);
    }

    /**
     * Get one complianceSchedule by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ComplianceScheduleDTO findOne(Long id) {
        log.debug("Request to get ComplianceSchedule : {}", id);
        ComplianceSchedule complianceSchedule = complianceScheduleRepository.findOne(id);
        return complianceScheduleMapper.toDto(complianceSchedule);
    }

    /**
     * Delete the complianceSchedule by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ComplianceSchedule : {}", id);
        complianceScheduleRepository.delete(id);
    }
}
