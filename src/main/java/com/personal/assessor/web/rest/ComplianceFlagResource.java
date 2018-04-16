package com.personal.assessor.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.personal.assessor.service.ComplianceFlagService;
import com.personal.assessor.web.rest.errors.BadRequestAlertException;
import com.personal.assessor.web.rest.util.HeaderUtil;
import com.personal.assessor.web.rest.util.PaginationUtil;
import com.personal.assessor.service.dto.ComplianceFlagDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ComplianceFlag.
 */
@RestController
@RequestMapping("/api")
public class ComplianceFlagResource {

    private final Logger log = LoggerFactory.getLogger(ComplianceFlagResource.class);

    private static final String ENTITY_NAME = "complianceFlag";

    private final ComplianceFlagService complianceFlagService;

    public ComplianceFlagResource(ComplianceFlagService complianceFlagService) {
        this.complianceFlagService = complianceFlagService;
    }

    /**
     * POST  /compliance-flags : Create a new complianceFlag.
     *
     * @param complianceFlagDTO the complianceFlagDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new complianceFlagDTO, or with status 400 (Bad Request) if the complianceFlag has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/compliance-flags")
    @Timed
    public ResponseEntity<ComplianceFlagDTO> createComplianceFlag(@Valid @RequestBody ComplianceFlagDTO complianceFlagDTO) throws URISyntaxException {
        log.debug("REST request to save ComplianceFlag : {}", complianceFlagDTO);
        if (complianceFlagDTO.getId() != null) {
            throw new BadRequestAlertException("A new complianceFlag cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ComplianceFlagDTO result = complianceFlagService.save(complianceFlagDTO);
        return ResponseEntity.created(new URI("/api/compliance-flags/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /compliance-flags : Updates an existing complianceFlag.
     *
     * @param complianceFlagDTO the complianceFlagDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated complianceFlagDTO,
     * or with status 400 (Bad Request) if the complianceFlagDTO is not valid,
     * or with status 500 (Internal Server Error) if the complianceFlagDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/compliance-flags")
    @Timed
    public ResponseEntity<ComplianceFlagDTO> updateComplianceFlag(@Valid @RequestBody ComplianceFlagDTO complianceFlagDTO) throws URISyntaxException {
        log.debug("REST request to update ComplianceFlag : {}", complianceFlagDTO);
        if (complianceFlagDTO.getId() == null) {
            return createComplianceFlag(complianceFlagDTO);
        }
        ComplianceFlagDTO result = complianceFlagService.save(complianceFlagDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, complianceFlagDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /compliance-flags : get all the complianceFlags.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of complianceFlags in body
     */
    @GetMapping("/compliance-flags")
    @Timed
    public ResponseEntity<List<ComplianceFlagDTO>> getAllComplianceFlags(Pageable pageable) {
        log.debug("REST request to get a page of ComplianceFlags");
        Page<ComplianceFlagDTO> page = complianceFlagService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/compliance-flags");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /compliance-flags/:id : get the "id" complianceFlag.
     *
     * @param id the id of the complianceFlagDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the complianceFlagDTO, or with status 404 (Not Found)
     */
    @GetMapping("/compliance-flags/{id}")
    @Timed
    public ResponseEntity<ComplianceFlagDTO> getComplianceFlag(@PathVariable Long id) {
        log.debug("REST request to get ComplianceFlag : {}", id);
        ComplianceFlagDTO complianceFlagDTO = complianceFlagService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(complianceFlagDTO));
    }

    /**
     * DELETE  /compliance-flags/:id : delete the "id" complianceFlag.
     *
     * @param id the id of the complianceFlagDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/compliance-flags/{id}")
    @Timed
    public ResponseEntity<Void> deleteComplianceFlag(@PathVariable Long id) {
        log.debug("REST request to delete ComplianceFlag : {}", id);
        complianceFlagService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
