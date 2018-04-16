package com.personal.assessor.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.personal.assessor.service.ComplianceValuesService;
import com.personal.assessor.web.rest.errors.BadRequestAlertException;
import com.personal.assessor.web.rest.util.HeaderUtil;
import com.personal.assessor.web.rest.util.PaginationUtil;
import com.personal.assessor.service.dto.ComplianceValuesDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ComplianceValues.
 */
@RestController
@RequestMapping("/api")
public class ComplianceValuesResource {

    private final Logger log = LoggerFactory.getLogger(ComplianceValuesResource.class);

    private static final String ENTITY_NAME = "complianceValues";

    private final ComplianceValuesService complianceValuesService;

    public ComplianceValuesResource(ComplianceValuesService complianceValuesService) {
        this.complianceValuesService = complianceValuesService;
    }

    /**
     * POST  /compliance-values : Create a new complianceValues.
     *
     * @param complianceValuesDTO the complianceValuesDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new complianceValuesDTO, or with status 400 (Bad Request) if the complianceValues has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/compliance-values")
    @Timed
    public ResponseEntity<ComplianceValuesDTO> createComplianceValues(@RequestBody ComplianceValuesDTO complianceValuesDTO) throws URISyntaxException {
        log.debug("REST request to save ComplianceValues : {}", complianceValuesDTO);
        if (complianceValuesDTO.getId() != null) {
            throw new BadRequestAlertException("A new complianceValues cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ComplianceValuesDTO result = complianceValuesService.save(complianceValuesDTO);
        return ResponseEntity.created(new URI("/api/compliance-values/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /compliance-values : Updates an existing complianceValues.
     *
     * @param complianceValuesDTO the complianceValuesDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated complianceValuesDTO,
     * or with status 400 (Bad Request) if the complianceValuesDTO is not valid,
     * or with status 500 (Internal Server Error) if the complianceValuesDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/compliance-values")
    @Timed
    public ResponseEntity<ComplianceValuesDTO> updateComplianceValues(@RequestBody ComplianceValuesDTO complianceValuesDTO) throws URISyntaxException {
        log.debug("REST request to update ComplianceValues : {}", complianceValuesDTO);
        if (complianceValuesDTO.getId() == null) {
            return createComplianceValues(complianceValuesDTO);
        }
        ComplianceValuesDTO result = complianceValuesService.save(complianceValuesDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, complianceValuesDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /compliance-values : get all the complianceValues.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of complianceValues in body
     */
    @GetMapping("/compliance-values")
    @Timed
    public ResponseEntity<List<ComplianceValuesDTO>> getAllComplianceValues(Pageable pageable) {
        log.debug("REST request to get a page of ComplianceValues");
        Page<ComplianceValuesDTO> page = complianceValuesService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/compliance-values");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /compliance-values/:id : get the "id" complianceValues.
     *
     * @param id the id of the complianceValuesDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the complianceValuesDTO, or with status 404 (Not Found)
     */
    @GetMapping("/compliance-values/{id}")
    @Timed
    public ResponseEntity<ComplianceValuesDTO> getComplianceValues(@PathVariable Long id) {
        log.debug("REST request to get ComplianceValues : {}", id);
        ComplianceValuesDTO complianceValuesDTO = complianceValuesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(complianceValuesDTO));
    }

    /**
     * DELETE  /compliance-values/:id : delete the "id" complianceValues.
     *
     * @param id the id of the complianceValuesDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/compliance-values/{id}")
    @Timed
    public ResponseEntity<Void> deleteComplianceValues(@PathVariable Long id) {
        log.debug("REST request to delete ComplianceValues : {}", id);
        complianceValuesService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
