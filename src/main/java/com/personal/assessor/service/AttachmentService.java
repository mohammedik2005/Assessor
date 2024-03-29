package com.personal.assessor.service;

import com.personal.assessor.service.dto.AttachmentDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Attachment.
 */
public interface AttachmentService {

    /**
     * Save a attachment.
     *
     * @param attachmentDTO the entity to save
     * @return the persisted entity
     */
    AttachmentDTO save(AttachmentDTO attachmentDTO);

    /**
     * Get all the attachments.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<AttachmentDTO> findAll(Pageable pageable);

    /**
     * Get the "id" attachment.
     *
     * @param id the id of the entity
     * @return the entity
     */
    AttachmentDTO findOne(Long id);

    /**
     * Delete the "id" attachment.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
