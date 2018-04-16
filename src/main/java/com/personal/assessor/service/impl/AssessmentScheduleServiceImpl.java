package com.personal.assessor.service.impl;

import com.personal.assessor.service.AssessmentScheduleService;
import com.personal.assessor.domain.AssessmentSchedule;
import com.personal.assessor.repository.AssessmentScheduleRepository;
import com.personal.assessor.service.dto.AssessmentScheduleDTO;
import com.personal.assessor.service.mapper.AssessmentScheduleMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing AssessmentSchedule.
 */
@Service
@Transactional
public class AssessmentScheduleServiceImpl implements AssessmentScheduleService {

    private final Logger log = LoggerFactory.getLogger(AssessmentScheduleServiceImpl.class);

    private final AssessmentScheduleRepository assessmentScheduleRepository;

    private final AssessmentScheduleMapper assessmentScheduleMapper;

    public AssessmentScheduleServiceImpl(AssessmentScheduleRepository assessmentScheduleRepository, AssessmentScheduleMapper assessmentScheduleMapper) {
        this.assessmentScheduleRepository = assessmentScheduleRepository;
        this.assessmentScheduleMapper = assessmentScheduleMapper;
    }

    /**
     * Save a assessmentSchedule.
     *
     * @param assessmentScheduleDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public AssessmentScheduleDTO save(AssessmentScheduleDTO assessmentScheduleDTO) {
        log.debug("Request to save AssessmentSchedule : {}", assessmentScheduleDTO);
        AssessmentSchedule assessmentSchedule = assessmentScheduleMapper.toEntity(assessmentScheduleDTO);
        assessmentSchedule = assessmentScheduleRepository.save(assessmentSchedule);
        return assessmentScheduleMapper.toDto(assessmentSchedule);
    }

    /**
     * Get all the assessmentSchedules.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<AssessmentScheduleDTO> findAll(Pageable pageable) {
        log.debug("Request to get all AssessmentSchedules");
        return assessmentScheduleRepository.findAll(pageable)
            .map(assessmentScheduleMapper::toDto);
    }

    /**
     * Get one assessmentSchedule by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public AssessmentScheduleDTO findOne(Long id) {
        log.debug("Request to get AssessmentSchedule : {}", id);
        AssessmentSchedule assessmentSchedule = assessmentScheduleRepository.findOneWithEagerRelationships(id);
        return assessmentScheduleMapper.toDto(assessmentSchedule);
    }

    /**
     * Delete the assessmentSchedule by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete AssessmentSchedule : {}", id);
        assessmentScheduleRepository.delete(id);
    }
}
