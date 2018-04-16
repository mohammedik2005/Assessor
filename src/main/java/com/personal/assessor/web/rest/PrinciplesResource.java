package com.personal.assessor.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.personal.assessor.service.PrinciplesService;
import com.personal.assessor.web.rest.errors.BadRequestAlertException;
import com.personal.assessor.web.rest.util.HeaderUtil;
import com.personal.assessor.web.rest.util.PaginationUtil;
import com.personal.assessor.service.dto.PrinciplesDTO;
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
 * REST controller for managing Principles.
 */
@RestController
@RequestMapping("/api")
public class PrinciplesResource {

    private final Logger log = LoggerFactory.getLogger(PrinciplesResource.class);

    private static final String ENTITY_NAME = "principles";

    private final PrinciplesService principlesService;

    public PrinciplesResource(PrinciplesService principlesService) {
        this.principlesService = principlesService;
    }

    /**
     * POST  /principles : Create a new principles.
     *
     * @param principlesDTO the principlesDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new principlesDTO, or with status 400 (Bad Request) if the principles has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/principles")
    @Timed
    public ResponseEntity<PrinciplesDTO> createPrinciples(@Valid @RequestBody PrinciplesDTO principlesDTO) throws URISyntaxException {
        log.debug("REST request to save Principles : {}", principlesDTO);
        if (principlesDTO.getId() != null) {
            throw new BadRequestAlertException("A new principles cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PrinciplesDTO result = principlesService.save(principlesDTO);
        return ResponseEntity.created(new URI("/api/principles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /principles : Updates an existing principles.
     *
     * @param principlesDTO the principlesDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated principlesDTO,
     * or with status 400 (Bad Request) if the principlesDTO is not valid,
     * or with status 500 (Internal Server Error) if the principlesDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/principles")
    @Timed
    public ResponseEntity<PrinciplesDTO> updatePrinciples(@Valid @RequestBody PrinciplesDTO principlesDTO) throws URISyntaxException {
        log.debug("REST request to update Principles : {}", principlesDTO);
        if (principlesDTO.getId() == null) {
            return createPrinciples(principlesDTO);
        }
        PrinciplesDTO result = principlesService.save(principlesDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, principlesDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /principles : get all the principles.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of principles in body
     */
    @GetMapping("/principles")
    @Timed
    public ResponseEntity<List<PrinciplesDTO>> getAllPrinciples(Pageable pageable) {
        log.debug("REST request to get a page of Principles");
        Page<PrinciplesDTO> page = principlesService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/principles");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /principles/:id : get the "id" principles.
     *
     * @param id the id of the principlesDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the principlesDTO, or with status 404 (Not Found)
     */
    @GetMapping("/principles/{id}")
    @Timed
    public ResponseEntity<PrinciplesDTO> getPrinciples(@PathVariable Long id) {
        log.debug("REST request to get Principles : {}", id);
        PrinciplesDTO principlesDTO = principlesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(principlesDTO));
    }

    /**
     * DELETE  /principles/:id : delete the "id" principles.
     *
     * @param id the id of the principlesDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/principles/{id}")
    @Timed
    public ResponseEntity<Void> deletePrinciples(@PathVariable Long id) {
        log.debug("REST request to delete Principles : {}", id);
        principlesService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
