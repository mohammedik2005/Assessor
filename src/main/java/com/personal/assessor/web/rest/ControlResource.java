package com.personal.assessor.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.personal.assessor.service.ControlService;
import com.personal.assessor.web.rest.errors.BadRequestAlertException;
import com.personal.assessor.web.rest.util.HeaderUtil;
import com.personal.assessor.web.rest.util.PaginationUtil;
import com.personal.assessor.service.dto.ControlDTO;
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
 * REST controller for managing Control.
 */
@RestController
@RequestMapping("/api")
public class ControlResource {

    private final Logger log = LoggerFactory.getLogger(ControlResource.class);

    private static final String ENTITY_NAME = "control";

    private final ControlService controlService;

    public ControlResource(ControlService controlService) {
        this.controlService = controlService;
    }

    /**
     * POST  /controls : Create a new control.
     *
     * @param controlDTO the controlDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new controlDTO, or with status 400 (Bad Request) if the control has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/controls")
    @Timed
    public ResponseEntity<ControlDTO> createControl(@Valid @RequestBody ControlDTO controlDTO) throws URISyntaxException {
        log.debug("REST request to save Control : {}", controlDTO);
        if (controlDTO.getId() != null) {
            throw new BadRequestAlertException("A new control cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ControlDTO result = controlService.save(controlDTO);
        return ResponseEntity.created(new URI("/api/controls/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /controls : Updates an existing control.
     *
     * @param controlDTO the controlDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated controlDTO,
     * or with status 400 (Bad Request) if the controlDTO is not valid,
     * or with status 500 (Internal Server Error) if the controlDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/controls")
    @Timed
    public ResponseEntity<ControlDTO> updateControl(@Valid @RequestBody ControlDTO controlDTO) throws URISyntaxException {
        log.debug("REST request to update Control : {}", controlDTO);
        if (controlDTO.getId() == null) {
            return createControl(controlDTO);
        }
        ControlDTO result = controlService.save(controlDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, controlDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /controls : get all the controls.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of controls in body
     */
    @GetMapping("/controls")
    @Timed
    public ResponseEntity<List<ControlDTO>> getAllControls(Pageable pageable) {
        log.debug("REST request to get a page of Controls");
        Page<ControlDTO> page = controlService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/controls");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /controls/:id : get the "id" control.
     *
     * @param id the id of the controlDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the controlDTO, or with status 404 (Not Found)
     */
    @GetMapping("/controls/{id}")
    @Timed
    public ResponseEntity<ControlDTO> getControl(@PathVariable Long id) {
        log.debug("REST request to get Control : {}", id);
        ControlDTO controlDTO = controlService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(controlDTO));
    }

    /**
     * DELETE  /controls/:id : delete the "id" control.
     *
     * @param id the id of the controlDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/controls/{id}")
    @Timed
    public ResponseEntity<Void> deleteControl(@PathVariable Long id) {
        log.debug("REST request to delete Control : {}", id);
        controlService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
