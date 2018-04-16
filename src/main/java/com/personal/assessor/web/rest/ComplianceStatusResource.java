package com.personal.assessor.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.personal.assessor.service.ComplianceStatusService;
import com.personal.assessor.web.rest.errors.BadRequestAlertException;
import com.personal.assessor.web.rest.util.HeaderUtil;
import com.personal.assessor.web.rest.util.PaginationUtil;
import com.personal.assessor.service.dto.ComplianceStatusDTO;
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
 * REST controller for managing ComplianceStatus.
 */
@RestController
@RequestMapping("/api")
public class ComplianceStatusResource {

    private final Logger log = LoggerFactory.getLogger(ComplianceStatusResource.class);

    private static final String ENTITY_NAME = "complianceStatus";

    private final ComplianceStatusService complianceStatusService;

    public ComplianceStatusResource(ComplianceStatusService complianceStatusService) {
        this.complianceStatusService = complianceStatusService;
    }

    /**
     * POST  /compliance-statuses : Create a new complianceStatus.
     *
     * @param complianceStatusDTO the complianceStatusDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new complianceStatusDTO, or with status 400 (Bad Request) if the complianceStatus has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/compliance-statuses")
    @Timed
    public ResponseEntity<ComplianceStatusDTO> createComplianceStatus(@Valid @RequestBody ComplianceStatusDTO complianceStatusDTO) throws URISyntaxException {
        log.debug("REST request to save ComplianceStatus : {}", complianceStatusDTO);
        if (complianceStatusDTO.getId() != null) {
            throw new BadRequestAlertException("A new complianceStatus cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ComplianceStatusDTO result = complianceStatusService.save(complianceStatusDTO);
        return ResponseEntity.created(new URI("/api/compliance-statuses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /compliance-statuses : Updates an existing complianceStatus.
     *
     * @param complianceStatusDTO the complianceStatusDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated complianceStatusDTO,
     * or with status 400 (Bad Request) if the complianceStatusDTO is not valid,
     * or with status 500 (Internal Server Error) if the complianceStatusDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/compliance-statuses")
    @Timed
    public ResponseEntity<ComplianceStatusDTO> updateComplianceStatus(@Valid @RequestBody ComplianceStatusDTO complianceStatusDTO) throws URISyntaxException {
        log.debug("REST request to update ComplianceStatus : {}", complianceStatusDTO);
        if (complianceStatusDTO.getId() == null) {
            return createComplianceStatus(complianceStatusDTO);
        }
        ComplianceStatusDTO result = complianceStatusService.save(complianceStatusDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, complianceStatusDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /compliance-statuses : get all the complianceStatuses.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of complianceStatuses in body
     */
    @GetMapping("/compliance-statuses")
    @Timed
    public ResponseEntity<List<ComplianceStatusDTO>> getAllComplianceStatuses(Pageable pageable) {
        log.debug("REST request to get a page of ComplianceStatuses");
        Page<ComplianceStatusDTO> page = complianceStatusService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/compliance-statuses");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /compliance-statuses/:id : get the "id" complianceStatus.
     *
     * @param id the id of the complianceStatusDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the complianceStatusDTO, or with status 404 (Not Found)
     */
    @GetMapping("/compliance-statuses/{id}")
    @Timed
    public ResponseEntity<ComplianceStatusDTO> getComplianceStatus(@PathVariable Long id) {
        log.debug("REST request to get ComplianceStatus : {}", id);
        ComplianceStatusDTO complianceStatusDTO = complianceStatusService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(complianceStatusDTO));
    }

    /**
     * DELETE  /compliance-statuses/:id : delete the "id" complianceStatus.
     *
     * @param id the id of the complianceStatusDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/compliance-statuses/{id}")
    @Timed
    public ResponseEntity<Void> deleteComplianceStatus(@PathVariable Long id) {
        log.debug("REST request to delete ComplianceStatus : {}", id);
        complianceStatusService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
