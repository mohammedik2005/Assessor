package com.personal.assessor.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.personal.assessor.service.ComplianceScheduleService;
import com.personal.assessor.web.rest.errors.BadRequestAlertException;
import com.personal.assessor.web.rest.util.HeaderUtil;
import com.personal.assessor.web.rest.util.PaginationUtil;
import com.personal.assessor.service.dto.ComplianceScheduleDTO;
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
 * REST controller for managing ComplianceSchedule.
 */
@RestController
@RequestMapping("/api")
public class ComplianceScheduleResource {

    private final Logger log = LoggerFactory.getLogger(ComplianceScheduleResource.class);

    private static final String ENTITY_NAME = "complianceSchedule";

    private final ComplianceScheduleService complianceScheduleService;

    public ComplianceScheduleResource(ComplianceScheduleService complianceScheduleService) {
        this.complianceScheduleService = complianceScheduleService;
    }

    /**
     * POST  /compliance-schedules : Create a new complianceSchedule.
     *
     * @param complianceScheduleDTO the complianceScheduleDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new complianceScheduleDTO, or with status 400 (Bad Request) if the complianceSchedule has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/compliance-schedules")
    @Timed
    public ResponseEntity<ComplianceScheduleDTO> createComplianceSchedule(@Valid @RequestBody ComplianceScheduleDTO complianceScheduleDTO) throws URISyntaxException {
        log.debug("REST request to save ComplianceSchedule : {}", complianceScheduleDTO);
        if (complianceScheduleDTO.getId() != null) {
            throw new BadRequestAlertException("A new complianceSchedule cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ComplianceScheduleDTO result = complianceScheduleService.save(complianceScheduleDTO);
        return ResponseEntity.created(new URI("/api/compliance-schedules/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /compliance-schedules : Updates an existing complianceSchedule.
     *
     * @param complianceScheduleDTO the complianceScheduleDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated complianceScheduleDTO,
     * or with status 400 (Bad Request) if the complianceScheduleDTO is not valid,
     * or with status 500 (Internal Server Error) if the complianceScheduleDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/compliance-schedules")
    @Timed
    public ResponseEntity<ComplianceScheduleDTO> updateComplianceSchedule(@Valid @RequestBody ComplianceScheduleDTO complianceScheduleDTO) throws URISyntaxException {
        log.debug("REST request to update ComplianceSchedule : {}", complianceScheduleDTO);
        if (complianceScheduleDTO.getId() == null) {
            return createComplianceSchedule(complianceScheduleDTO);
        }
        ComplianceScheduleDTO result = complianceScheduleService.save(complianceScheduleDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, complianceScheduleDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /compliance-schedules : get all the complianceSchedules.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of complianceSchedules in body
     */
    @GetMapping("/compliance-schedules")
    @Timed
    public ResponseEntity<List<ComplianceScheduleDTO>> getAllComplianceSchedules(Pageable pageable) {
        log.debug("REST request to get a page of ComplianceSchedules");
        Page<ComplianceScheduleDTO> page = complianceScheduleService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/compliance-schedules");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /compliance-schedules/:id : get the "id" complianceSchedule.
     *
     * @param id the id of the complianceScheduleDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the complianceScheduleDTO, or with status 404 (Not Found)
     */
    @GetMapping("/compliance-schedules/{id}")
    @Timed
    public ResponseEntity<ComplianceScheduleDTO> getComplianceSchedule(@PathVariable Long id) {
        log.debug("REST request to get ComplianceSchedule : {}", id);
        ComplianceScheduleDTO complianceScheduleDTO = complianceScheduleService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(complianceScheduleDTO));
    }

    /**
     * DELETE  /compliance-schedules/:id : delete the "id" complianceSchedule.
     *
     * @param id the id of the complianceScheduleDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/compliance-schedules/{id}")
    @Timed
    public ResponseEntity<Void> deleteComplianceSchedule(@PathVariable Long id) {
        log.debug("REST request to delete ComplianceSchedule : {}", id);
        complianceScheduleService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
