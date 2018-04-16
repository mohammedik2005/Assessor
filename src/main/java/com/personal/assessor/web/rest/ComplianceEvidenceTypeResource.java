package com.personal.assessor.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.personal.assessor.service.ComplianceEvidenceTypeService;
import com.personal.assessor.web.rest.errors.BadRequestAlertException;
import com.personal.assessor.web.rest.util.HeaderUtil;
import com.personal.assessor.web.rest.util.PaginationUtil;
import com.personal.assessor.service.dto.ComplianceEvidenceTypeDTO;
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
 * REST controller for managing ComplianceEvidenceType.
 */
@RestController
@RequestMapping("/api")
public class ComplianceEvidenceTypeResource {

    private final Logger log = LoggerFactory.getLogger(ComplianceEvidenceTypeResource.class);

    private static final String ENTITY_NAME = "complianceEvidenceType";

    private final ComplianceEvidenceTypeService complianceEvidenceTypeService;

    public ComplianceEvidenceTypeResource(ComplianceEvidenceTypeService complianceEvidenceTypeService) {
        this.complianceEvidenceTypeService = complianceEvidenceTypeService;
    }

    /**
     * POST  /compliance-evidence-types : Create a new complianceEvidenceType.
     *
     * @param complianceEvidenceTypeDTO the complianceEvidenceTypeDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new complianceEvidenceTypeDTO, or with status 400 (Bad Request) if the complianceEvidenceType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/compliance-evidence-types")
    @Timed
    public ResponseEntity<ComplianceEvidenceTypeDTO> createComplianceEvidenceType(@Valid @RequestBody ComplianceEvidenceTypeDTO complianceEvidenceTypeDTO) throws URISyntaxException {
        log.debug("REST request to save ComplianceEvidenceType : {}", complianceEvidenceTypeDTO);
        if (complianceEvidenceTypeDTO.getId() != null) {
            throw new BadRequestAlertException("A new complianceEvidenceType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ComplianceEvidenceTypeDTO result = complianceEvidenceTypeService.save(complianceEvidenceTypeDTO);
        return ResponseEntity.created(new URI("/api/compliance-evidence-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /compliance-evidence-types : Updates an existing complianceEvidenceType.
     *
     * @param complianceEvidenceTypeDTO the complianceEvidenceTypeDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated complianceEvidenceTypeDTO,
     * or with status 400 (Bad Request) if the complianceEvidenceTypeDTO is not valid,
     * or with status 500 (Internal Server Error) if the complianceEvidenceTypeDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/compliance-evidence-types")
    @Timed
    public ResponseEntity<ComplianceEvidenceTypeDTO> updateComplianceEvidenceType(@Valid @RequestBody ComplianceEvidenceTypeDTO complianceEvidenceTypeDTO) throws URISyntaxException {
        log.debug("REST request to update ComplianceEvidenceType : {}", complianceEvidenceTypeDTO);
        if (complianceEvidenceTypeDTO.getId() == null) {
            return createComplianceEvidenceType(complianceEvidenceTypeDTO);
        }
        ComplianceEvidenceTypeDTO result = complianceEvidenceTypeService.save(complianceEvidenceTypeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, complianceEvidenceTypeDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /compliance-evidence-types : get all the complianceEvidenceTypes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of complianceEvidenceTypes in body
     */
    @GetMapping("/compliance-evidence-types")
    @Timed
    public ResponseEntity<List<ComplianceEvidenceTypeDTO>> getAllComplianceEvidenceTypes(Pageable pageable) {
        log.debug("REST request to get a page of ComplianceEvidenceTypes");
        Page<ComplianceEvidenceTypeDTO> page = complianceEvidenceTypeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/compliance-evidence-types");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /compliance-evidence-types/:id : get the "id" complianceEvidenceType.
     *
     * @param id the id of the complianceEvidenceTypeDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the complianceEvidenceTypeDTO, or with status 404 (Not Found)
     */
    @GetMapping("/compliance-evidence-types/{id}")
    @Timed
    public ResponseEntity<ComplianceEvidenceTypeDTO> getComplianceEvidenceType(@PathVariable Long id) {
        log.debug("REST request to get ComplianceEvidenceType : {}", id);
        ComplianceEvidenceTypeDTO complianceEvidenceTypeDTO = complianceEvidenceTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(complianceEvidenceTypeDTO));
    }

    /**
     * DELETE  /compliance-evidence-types/:id : delete the "id" complianceEvidenceType.
     *
     * @param id the id of the complianceEvidenceTypeDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/compliance-evidence-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteComplianceEvidenceType(@PathVariable Long id) {
        log.debug("REST request to delete ComplianceEvidenceType : {}", id);
        complianceEvidenceTypeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
