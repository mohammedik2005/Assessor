package com.personal.assessor.service.impl;

import com.personal.assessor.service.ComplianceEvidenceNoteService;
import com.personal.assessor.domain.ComplianceEvidenceNote;
import com.personal.assessor.repository.ComplianceEvidenceNoteRepository;
import com.personal.assessor.service.dto.ComplianceEvidenceNoteDTO;
import com.personal.assessor.service.mapper.ComplianceEvidenceNoteMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing ComplianceEvidenceNote.
 */
@Service
@Transactional
public class ComplianceEvidenceNoteServiceImpl implements ComplianceEvidenceNoteService {

    private final Logger log = LoggerFactory.getLogger(ComplianceEvidenceNoteServiceImpl.class);

    private final ComplianceEvidenceNoteRepository complianceEvidenceNoteRepository;

    private final ComplianceEvidenceNoteMapper complianceEvidenceNoteMapper;

    public ComplianceEvidenceNoteServiceImpl(ComplianceEvidenceNoteRepository complianceEvidenceNoteRepository, ComplianceEvidenceNoteMapper complianceEvidenceNoteMapper) {
        this.complianceEvidenceNoteRepository = complianceEvidenceNoteRepository;
        this.complianceEvidenceNoteMapper = complianceEvidenceNoteMapper;
    }

    /**
     * Save a complianceEvidenceNote.
     *
     * @param complianceEvidenceNoteDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ComplianceEvidenceNoteDTO save(ComplianceEvidenceNoteDTO complianceEvidenceNoteDTO) {
        log.debug("Request to save ComplianceEvidenceNote : {}", complianceEvidenceNoteDTO);
        ComplianceEvidenceNote complianceEvidenceNote = complianceEvidenceNoteMapper.toEntity(complianceEvidenceNoteDTO);
        complianceEvidenceNote = complianceEvidenceNoteRepository.save(complianceEvidenceNote);
        return complianceEvidenceNoteMapper.toDto(complianceEvidenceNote);
    }

    /**
     * Get all the complianceEvidenceNotes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ComplianceEvidenceNoteDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ComplianceEvidenceNotes");
        return complianceEvidenceNoteRepository.findAll(pageable)
            .map(complianceEvidenceNoteMapper::toDto);
    }

    /**
     * Get one complianceEvidenceNote by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ComplianceEvidenceNoteDTO findOne(Long id) {
        log.debug("Request to get ComplianceEvidenceNote : {}", id);
        ComplianceEvidenceNote complianceEvidenceNote = complianceEvidenceNoteRepository.findOneWithEagerRelationships(id);
        return complianceEvidenceNoteMapper.toDto(complianceEvidenceNote);
    }

    /**
     * Delete the complianceEvidenceNote by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ComplianceEvidenceNote : {}", id);
        complianceEvidenceNoteRepository.delete(id);
    }
}
