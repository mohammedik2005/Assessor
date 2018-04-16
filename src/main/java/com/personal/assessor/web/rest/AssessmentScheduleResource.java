package com.personal.assessor.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.personal.assessor.service.AssessmentScheduleService;
import com.personal.assessor.web.rest.errors.BadRequestAlertException;
import com.personal.assessor.web.rest.util.HeaderUtil;
import com.personal.assessor.web.rest.util.PaginationUtil;
import com.personal.assessor.service.dto.AssessmentScheduleDTO;
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
 * REST controller for managing AssessmentSchedule.
 */
@RestController
@RequestMapping("/api")
public class AssessmentScheduleResource {

    private final Logger log = LoggerFactory.getLogger(AssessmentScheduleResource.class);

    private static final String ENTITY_NAME = "assessmentSchedule";

    private final AssessmentScheduleService assessmentScheduleService;

    public AssessmentScheduleResource(AssessmentScheduleService assessmentScheduleService) {
        this.assessmentScheduleService = assessmentScheduleService;
    }

    /**
     * POST  /assessment-schedules : Create a new assessmentSchedule.
     *
     * @param assessmentScheduleDTO the assessmentScheduleDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new assessmentScheduleDTO, or with status 400 (Bad Request) if the assessmentSchedule has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/assessment-schedules")
    @Timed
    public ResponseEntity<AssessmentScheduleDTO> createAssessmentSchedule(@RequestBody AssessmentScheduleDTO assessmentScheduleDTO) throws URISyntaxException {
        log.debug("REST request to save AssessmentSchedule : {}", assessmentScheduleDTO);
        if (assessmentScheduleDTO.getId() != null) {
            throw new BadRequestAlertException("A new assessmentSchedule cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AssessmentScheduleDTO result = assessmentScheduleService.save(assessmentScheduleDTO);
        return ResponseEntity.created(new URI("/api/assessment-schedules/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /assessment-schedules : Updates an existing assessmentSchedule.
     *
     * @param assessmentScheduleDTO the assessmentScheduleDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated assessmentScheduleDTO,
     * or with status 400 (Bad Request) if the assessmentScheduleDTO is not valid,
     * or with status 500 (Internal Server Error) if the assessmentScheduleDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/assessment-schedules")
    @Timed
    public ResponseEntity<AssessmentScheduleDTO> updateAssessmentSchedule(@RequestBody AssessmentScheduleDTO assessmentScheduleDTO) throws URISyntaxException {
        log.debug("REST request to update AssessmentSchedule : {}", assessmentScheduleDTO);
        if (assessmentScheduleDTO.getId() == null) {
            return createAssessmentSchedule(assessmentScheduleDTO);
        }
        AssessmentScheduleDTO result = assessmentScheduleService.save(assessmentScheduleDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, assessmentScheduleDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /assessment-schedules : get all the assessmentSchedules.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of assessmentSchedules in body
     */
    @GetMapping("/assessment-schedules")
    @Timed
    public ResponseEntity<List<AssessmentScheduleDTO>> getAllAssessmentSchedules(Pageable pageable) {
        log.debug("REST request to get a page of AssessmentSchedules");
        Page<AssessmentScheduleDTO> page = assessmentScheduleService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/assessment-schedules");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /assessment-schedules/:id : get the "id" assessmentSchedule.
     *
     * @param id the id of the assessmentScheduleDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the assessmentScheduleDTO, or with status 404 (Not Found)
     */
    @GetMapping("/assessment-schedules/{id}")
    @Timed
    public ResponseEntity<AssessmentScheduleDTO> getAssessmentSchedule(@PathVariable Long id) {
        log.debug("REST request to get AssessmentSchedule : {}", id);
        AssessmentScheduleDTO assessmentScheduleDTO = assessmentScheduleService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(assessmentScheduleDTO));
    }

    /**
     * DELETE  /assessment-schedules/:id : delete the "id" assessmentSchedule.
     *
     * @param id the id of the assessmentScheduleDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/assessment-schedules/{id}")
    @Timed
    public ResponseEntity<Void> deleteAssessmentSchedule(@PathVariable Long id) {
        log.debug("REST request to delete AssessmentSchedule : {}", id);
        assessmentScheduleService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
