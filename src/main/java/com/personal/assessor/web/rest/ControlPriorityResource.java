package com.personal.assessor.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.personal.assessor.service.ControlPriorityService;
import com.personal.assessor.web.rest.errors.BadRequestAlertException;
import com.personal.assessor.web.rest.util.HeaderUtil;
import com.personal.assessor.web.rest.util.PaginationUtil;
import com.personal.assessor.service.dto.ControlPriorityDTO;
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
 * REST controller for managing ControlPriority.
 */
@RestController
@RequestMapping("/api")
public class ControlPriorityResource {

    private final Logger log = LoggerFactory.getLogger(ControlPriorityResource.class);

    private static final String ENTITY_NAME = "controlPriority";

    private final ControlPriorityService controlPriorityService;

    public ControlPriorityResource(ControlPriorityService controlPriorityService) {
        this.controlPriorityService = controlPriorityService;
    }

    /**
     * POST  /control-priorities : Create a new controlPriority.
     *
     * @param controlPriorityDTO the controlPriorityDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new controlPriorityDTO, or with status 400 (Bad Request) if the controlPriority has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/control-priorities")
    @Timed
    public ResponseEntity<ControlPriorityDTO> createControlPriority(@Valid @RequestBody ControlPriorityDTO controlPriorityDTO) throws URISyntaxException {
        log.debug("REST request to save ControlPriority : {}", controlPriorityDTO);
        if (controlPriorityDTO.getId() != null) {
            throw new BadRequestAlertException("A new controlPriority cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ControlPriorityDTO result = controlPriorityService.save(controlPriorityDTO);
        return ResponseEntity.created(new URI("/api/control-priorities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /control-priorities : Updates an existing controlPriority.
     *
     * @param controlPriorityDTO the controlPriorityDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated controlPriorityDTO,
     * or with status 400 (Bad Request) if the controlPriorityDTO is not valid,
     * or with status 500 (Internal Server Error) if the controlPriorityDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/control-priorities")
    @Timed
    public ResponseEntity<ControlPriorityDTO> updateControlPriority(@Valid @RequestBody ControlPriorityDTO controlPriorityDTO) throws URISyntaxException {
        log.debug("REST request to update ControlPriority : {}", controlPriorityDTO);
        if (controlPriorityDTO.getId() == null) {
            return createControlPriority(controlPriorityDTO);
        }
        ControlPriorityDTO result = controlPriorityService.save(controlPriorityDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, controlPriorityDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /control-priorities : get all the controlPriorities.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of controlPriorities in body
     */
    @GetMapping("/control-priorities")
    @Timed
    public ResponseEntity<List<ControlPriorityDTO>> getAllControlPriorities(Pageable pageable) {
        log.debug("REST request to get a page of ControlPriorities");
        Page<ControlPriorityDTO> page = controlPriorityService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/control-priorities");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /control-priorities/:id : get the "id" controlPriority.
     *
     * @param id the id of the controlPriorityDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the controlPriorityDTO, or with status 404 (Not Found)
     */
    @GetMapping("/control-priorities/{id}")
    @Timed
    public ResponseEntity<ControlPriorityDTO> getControlPriority(@PathVariable Long id) {
        log.debug("REST request to get ControlPriority : {}", id);
        ControlPriorityDTO controlPriorityDTO = controlPriorityService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(controlPriorityDTO));
    }

    /**
     * DELETE  /control-priorities/:id : delete the "id" controlPriority.
     *
     * @param id the id of the controlPriorityDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/control-priorities/{id}")
    @Timed
    public ResponseEntity<Void> deleteControlPriority(@PathVariable Long id) {
        log.debug("REST request to delete ControlPriority : {}", id);
        controlPriorityService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
