package com.personal.assessor.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.personal.assessor.service.ComplianceEvidenceStatusService;
import com.personal.assessor.web.rest.errors.BadRequestAlertException;
import com.personal.assessor.web.rest.util.HeaderUtil;
import com.personal.assessor.web.rest.util.PaginationUtil;
import com.personal.assessor.service.dto.ComplianceEvidenceStatusDTO;
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
 * REST controller for managing ComplianceEvidenceStatus.
 */
@RestController
@RequestMapping("/api")
public class ComplianceEvidenceStatusResource {

    private final Logger log = LoggerFactory.getLogger(ComplianceEvidenceStatusResource.class);

    private static final String ENTITY_NAME = "complianceEvidenceStatus";

    private final ComplianceEvidenceStatusService complianceEvidenceStatusService;

    public ComplianceEvidenceStatusResource(ComplianceEvidenceStatusService complianceEvidenceStatusService) {
        this.complianceEvidenceStatusService = complianceEvidenceStatusService;
    }

    /**
     * POST  /compliance-evidence-statuses : Create a new complianceEvidenceStatus.
     *
     * @param complianceEvidenceStatusDTO the complianceEvidenceStatusDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new complianceEvidenceStatusDTO, or with status 400 (Bad Request) if the complianceEvidenceStatus has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/compliance-evidence-statuses")
    @Timed
    public ResponseEntity<ComplianceEvidenceStatusDTO> createComplianceEvidenceStatus(@Valid @RequestBody ComplianceEvidenceStatusDTO complianceEvidenceStatusDTO) throws URISyntaxException {
        log.debug("REST request to save ComplianceEvidenceStatus : {}", complianceEvidenceStatusDTO);
        if (complianceEvidenceStatusDTO.getId() != null) {
            throw new BadRequestAlertException("A new complianceEvidenceStatus cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ComplianceEvidenceStatusDTO result = complianceEvidenceStatusService.save(complianceEvidenceStatusDTO);
        return ResponseEntity.created(new URI("/api/compliance-evidence-statuses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /compliance-evidence-statuses : Updates an existing complianceEvidenceStatus.
     *
     * @param complianceEvidenceStatusDTO the complianceEvidenceStatusDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated complianceEvidenceStatusDTO,
     * or with status 400 (Bad Request) if the complianceEvidenceStatusDTO is not valid,
     * or with status 500 (Internal Server Error) if the complianceEvidenceStatusDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/compliance-evidence-statuses")
    @Timed
    public ResponseEntity<ComplianceEvidenceStatusDTO> updateComplianceEvidenceStatus(@Valid @RequestBody ComplianceEvidenceStatusDTO complianceEvidenceStatusDTO) throws URISyntaxException {
        log.debug("REST request to update ComplianceEvidenceStatus : {}", complianceEvidenceStatusDTO);
        if (complianceEvidenceStatusDTO.getId() == null) {
            return createComplianceEvidenceStatus(complianceEvidenceStatusDTO);
        }
        ComplianceEvidenceStatusDTO result = complianceEvidenceStatusService.save(complianceEvidenceStatusDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, complianceEvidenceStatusDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /compliance-evidence-statuses : get all the complianceEvidenceStatuses.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of complianceEvidenceStatuses in body
     */
    @GetMapping("/compliance-evidence-statuses")
    @Timed
    public ResponseEntity<List<ComplianceEvidenceStatusDTO>> getAllComplianceEvidenceStatuses(Pageable pageable) {
        log.debug("REST request to get a page of ComplianceEvidenceStatuses");
        Page<ComplianceEvidenceStatusDTO> page = complianceEvidenceStatusService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/compliance-evidence-statuses");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /compliance-evidence-statuses/:id : get the "id" complianceEvidenceStatus.
     *
     * @param id the id of the complianceEvidenceStatusDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the complianceEvidenceStatusDTO, or with status 404 (Not Found)
     */
    @GetMapping("/compliance-evidence-statuses/{id}")
    @Timed
    public ResponseEntity<ComplianceEvidenceStatusDTO> getComplianceEvidenceStatus(@PathVariable Long id) {
        log.debug("REST request to get ComplianceEvidenceStatus : {}", id);
        ComplianceEvidenceStatusDTO complianceEvidenceStatusDTO = complianceEvidenceStatusService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(complianceEvidenceStatusDTO));
    }

    /**
     * DELETE  /compliance-evidence-statuses/:id : delete the "id" complianceEvidenceStatus.
     *
     * @param id the id of the complianceEvidenceStatusDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/compliance-evidence-statuses/{id}")
    @Timed
    public ResponseEntity<Void> deleteComplianceEvidenceStatus(@PathVariable Long id) {
        log.debug("REST request to delete ComplianceEvidenceStatus : {}", id);
        complianceEvidenceStatusService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
