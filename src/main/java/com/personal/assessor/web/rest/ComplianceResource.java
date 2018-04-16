package com.personal.assessor.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.personal.assessor.service.ComplianceService;
import com.personal.assessor.web.rest.errors.BadRequestAlertException;
import com.personal.assessor.web.rest.util.HeaderUtil;
import com.personal.assessor.web.rest.util.PaginationUtil;
import com.personal.assessor.service.dto.ComplianceDTO;
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
 * REST controller for managing Compliance.
 */
@RestController
@RequestMapping("/api")
public class ComplianceResource {

    private final Logger log = LoggerFactory.getLogger(ComplianceResource.class);

    private static final String ENTITY_NAME = "compliance";

    private final ComplianceService complianceService;

    public ComplianceResource(ComplianceService complianceService) {
        this.complianceService = complianceService;
    }

    /**
     * POST  /compliances : Create a new compliance.
     *
     * @param complianceDTO the complianceDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new complianceDTO, or with status 400 (Bad Request) if the compliance has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/compliances")
    @Timed
    public ResponseEntity<ComplianceDTO> createCompliance(@RequestBody ComplianceDTO complianceDTO) throws URISyntaxException {
        log.debug("REST request to save Compliance : {}", complianceDTO);
        if (complianceDTO.getId() != null) {
            throw new BadRequestAlertException("A new compliance cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ComplianceDTO result = complianceService.save(complianceDTO);
        return ResponseEntity.created(new URI("/api/compliances/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /compliances : Updates an existing compliance.
     *
     * @param complianceDTO the complianceDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated complianceDTO,
     * or with status 400 (Bad Request) if the complianceDTO is not valid,
     * or with status 500 (Internal Server Error) if the complianceDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/compliances")
    @Timed
    public ResponseEntity<ComplianceDTO> updateCompliance(@RequestBody ComplianceDTO complianceDTO) throws URISyntaxException {
        log.debug("REST request to update Compliance : {}", complianceDTO);
        if (complianceDTO.getId() == null) {
            return createCompliance(complianceDTO);
        }
        ComplianceDTO result = complianceService.save(complianceDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, complianceDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /compliances : get all the compliances.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of compliances in body
     */
    @GetMapping("/compliances")
    @Timed
    public ResponseEntity<List<ComplianceDTO>> getAllCompliances(Pageable pageable) {
        log.debug("REST request to get a page of Compliances");
        Page<ComplianceDTO> page = complianceService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/compliances");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /compliances/:id : get the "id" compliance.
     *
     * @param id the id of the complianceDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the complianceDTO, or with status 404 (Not Found)
     */
    @GetMapping("/compliances/{id}")
    @Timed
    public ResponseEntity<ComplianceDTO> getCompliance(@PathVariable Long id) {
        log.debug("REST request to get Compliance : {}", id);
        ComplianceDTO complianceDTO = complianceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(complianceDTO));
    }

    /**
     * DELETE  /compliances/:id : delete the "id" compliance.
     *
     * @param id the id of the complianceDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/compliances/{id}")
    @Timed
    public ResponseEntity<Void> deleteCompliance(@PathVariable Long id) {
        log.debug("REST request to delete Compliance : {}", id);
        complianceService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
