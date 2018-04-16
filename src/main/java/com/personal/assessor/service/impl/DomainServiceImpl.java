package com.personal.assessor.service.impl;

import com.personal.assessor.service.DomainService;
import com.personal.assessor.domain.Domain;
import com.personal.assessor.repository.DomainRepository;
import com.personal.assessor.service.dto.DomainDTO;
import com.personal.assessor.service.mapper.DomainMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Domain.
 */
@Service
@Transactional
public class DomainServiceImpl implements DomainService {

    private final Logger log = LoggerFactory.getLogger(DomainServiceImpl.class);

    private final DomainRepository domainRepository;

    private final DomainMapper domainMapper;

    public DomainServiceImpl(DomainRepository domainRepository, DomainMapper domainMapper) {
        this.domainRepository = domainRepository;
        this.domainMapper = domainMapper;
    }

    /**
     * Save a domain.
     *
     * @param domainDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public DomainDTO save(DomainDTO domainDTO) {
        log.debug("Request to save Domain : {}", domainDTO);
        Domain domain = domainMapper.toEntity(domainDTO);
        domain = domainRepository.save(domain);
        return domainMapper.toDto(domain);
    }

    /**
     * Get all the domains.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<DomainDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Domains");
        return domainRepository.findAll(pageable)
            .map(domainMapper::toDto);
    }

    /**
     * Get one domain by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public DomainDTO findOne(Long id) {
        log.debug("Request to get Domain : {}", id);
        Domain domain = domainRepository.findOneWithEagerRelationships(id);
        return domainMapper.toDto(domain);
    }

    /**
     * Delete the domain by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Domain : {}", id);
        domainRepository.delete(id);
    }
}
