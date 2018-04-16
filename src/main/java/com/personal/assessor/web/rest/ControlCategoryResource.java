package com.personal.assessor.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.personal.assessor.service.ControlCategoryService;
import com.personal.assessor.web.rest.errors.BadRequestAlertException;
import com.personal.assessor.web.rest.util.HeaderUtil;
import com.personal.assessor.web.rest.util.PaginationUtil;
import com.personal.assessor.service.dto.ControlCategoryDTO;
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
 * REST controller for managing ControlCategory.
 */
@RestController
@RequestMapping("/api")
public class ControlCategoryResource {

    private final Logger log = LoggerFactory.getLogger(ControlCategoryResource.class);

    private static final String ENTITY_NAME = "controlCategory";

    private final ControlCategoryService controlCategoryService;

    public ControlCategoryResource(ControlCategoryService controlCategoryService) {
        this.controlCategoryService = controlCategoryService;
    }

    /**
     * POST  /control-categories : Create a new controlCategory.
     *
     * @param controlCategoryDTO the controlCategoryDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new controlCategoryDTO, or with status 400 (Bad Request) if the controlCategory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/control-categories")
    @Timed
    public ResponseEntity<ControlCategoryDTO> createControlCategory(@Valid @RequestBody ControlCategoryDTO controlCategoryDTO) throws URISyntaxException {
        log.debug("REST request to save ControlCategory : {}", controlCategoryDTO);
        if (controlCategoryDTO.getId() != null) {
            throw new BadRequestAlertException("A new controlCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ControlCategoryDTO result = controlCategoryService.save(controlCategoryDTO);
        return ResponseEntity.created(new URI("/api/control-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /control-categories : Updates an existing controlCategory.
     *
     * @param controlCategoryDTO the controlCategoryDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated controlCategoryDTO,
     * or with status 400 (Bad Request) if the controlCategoryDTO is not valid,
     * or with status 500 (Internal Server Error) if the controlCategoryDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/control-categories")
    @Timed
    public ResponseEntity<ControlCategoryDTO> updateControlCategory(@Valid @RequestBody ControlCategoryDTO controlCategoryDTO) throws URISyntaxException {
        log.debug("REST request to update ControlCategory : {}", controlCategoryDTO);
        if (controlCategoryDTO.getId() == null) {
            return createControlCategory(controlCategoryDTO);
        }
        ControlCategoryDTO result = controlCategoryService.save(controlCategoryDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, controlCategoryDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /control-categories : get all the controlCategories.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of controlCategories in body
     */
    @GetMapping("/control-categories")
    @Timed
    public ResponseEntity<List<ControlCategoryDTO>> getAllControlCategories(Pageable pageable) {
        log.debug("REST request to get a page of ControlCategories");
        Page<ControlCategoryDTO> page = controlCategoryService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/control-categories");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /control-categories/:id : get the "id" controlCategory.
     *
     * @param id the id of the controlCategoryDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the controlCategoryDTO, or with status 404 (Not Found)
     */
    @GetMapping("/control-categories/{id}")
    @Timed
    public ResponseEntity<ControlCategoryDTO> getControlCategory(@PathVariable Long id) {
        log.debug("REST request to get ControlCategory : {}", id);
        ControlCategoryDTO controlCategoryDTO = controlCategoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(controlCategoryDTO));
    }

    /**
     * DELETE  /control-categories/:id : delete the "id" controlCategory.
     *
     * @param id the id of the controlCategoryDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/control-categories/{id}")
    @Timed
    public ResponseEntity<Void> deleteControlCategory(@PathVariable Long id) {
        log.debug("REST request to delete ControlCategory : {}", id);
        controlCategoryService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
