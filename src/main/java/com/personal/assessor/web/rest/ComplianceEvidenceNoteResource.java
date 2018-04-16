package com.personal.assessor.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.personal.assessor.service.ComplianceEvidenceNoteService;
import com.personal.assessor.web.rest.errors.BadRequestAlertException;
import com.personal.assessor.web.rest.util.HeaderUtil;
import com.personal.assessor.web.rest.util.PaginationUtil;
import com.personal.assessor.service.dto.ComplianceEvidenceNoteDTO;
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
 * REST controller for managing ComplianceEvidenceNote.
 */
@RestController
@RequestMapping("/api")
public class ComplianceEvidenceNoteResource {

    private final Logger log = LoggerFactory.getLogger(ComplianceEvidenceNoteResource.class);

    private static final String ENTITY_NAME = "complianceEvidenceNote";

    private final ComplianceEvidenceNoteService complianceEvidenceNoteService;

    public ComplianceEvidenceNoteResource(ComplianceEvidenceNoteService complianceEvidenceNoteService) {
        this.complianceEvidenceNoteService = complianceEvidenceNoteService;
    }

    /**
     * POST  /compliance-evidence-notes : Create a new complianceEvidenceNote.
     *
     * @param complianceEvidenceNoteDTO the complianceEvidenceNoteDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new complianceEvidenceNoteDTO, or with status 400 (Bad Request) if the complianceEvidenceNote has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/compliance-evidence-notes")
    @Timed
    public ResponseEntity<ComplianceEvidenceNoteDTO> createComplianceEvidenceNote(@RequestBody ComplianceEvidenceNoteDTO complianceEvidenceNoteDTO) throws URISyntaxException {
        log.debug("REST request to save ComplianceEvidenceNote : {}", complianceEvidenceNoteDTO);
        if (complianceEvidenceNoteDTO.getId() != null) {
            throw new BadRequestAlertException("A new complianceEvidenceNote cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ComplianceEvidenceNoteDTO result = complianceEvidenceNoteService.save(complianceEvidenceNoteDTO);
        return ResponseEntity.created(new URI("/api/compliance-evidence-notes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /compliance-evidence-notes : Updates an existing complianceEvidenceNote.
     *
     * @param complianceEvidenceNoteDTO the complianceEvidenceNoteDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated complianceEvidenceNoteDTO,
     * or with status 400 (Bad Request) if the complianceEvidenceNoteDTO is not valid,
     * or with status 500 (Internal Server Error) if the complianceEvidenceNoteDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/compliance-evidence-notes")
    @Timed
    public ResponseEntity<ComplianceEvidenceNoteDTO> updateComplianceEvidenceNote(@RequestBody ComplianceEvidenceNoteDTO complianceEvidenceNoteDTO) throws URISyntaxException {
        log.debug("REST request to update ComplianceEvidenceNote : {}", complianceEvidenceNoteDTO);
        if (complianceEvidenceNoteDTO.getId() == null) {
            return createComplianceEvidenceNote(complianceEvidenceNoteDTO);
        }
        ComplianceEvidenceNoteDTO result = complianceEvidenceNoteService.save(complianceEvidenceNoteDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, complianceEvidenceNoteDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /compliance-evidence-notes : get all the complianceEvidenceNotes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of complianceEvidenceNotes in body
     */
    @GetMapping("/compliance-evidence-notes")
    @Timed
    public ResponseEntity<List<ComplianceEvidenceNoteDTO>> getAllComplianceEvidenceNotes(Pageable pageable) {
        log.debug("REST request to get a page of ComplianceEvidenceNotes");
        Page<ComplianceEvidenceNoteDTO> page = complianceEvidenceNoteService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/compliance-evidence-notes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /compliance-evidence-notes/:id : get the "id" complianceEvidenceNote.
     *
     * @param id the id of the complianceEvidenceNoteDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the complianceEvidenceNoteDTO, or with status 404 (Not Found)
     */
    @GetMapping("/compliance-evidence-notes/{id}")
    @Timed
    public ResponseEntity<ComplianceEvidenceNoteDTO> getComplianceEvidenceNote(@PathVariable Long id) {
        log.debug("REST request to get ComplianceEvidenceNote : {}", id);
        ComplianceEvidenceNoteDTO complianceEvidenceNoteDTO = complianceEvidenceNoteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(complianceEvidenceNoteDTO));
    }

    /**
     * DELETE  /compliance-evidence-notes/:id : delete the "id" complianceEvidenceNote.
     *
     * @param id the id of the complianceEvidenceNoteDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/compliance-evidence-notes/{id}")
    @Timed
    public ResponseEntity<Void> deleteComplianceEvidenceNote(@PathVariable Long id) {
        log.debug("REST request to delete ComplianceEvidenceNote : {}", id);
        complianceEvidenceNoteService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
