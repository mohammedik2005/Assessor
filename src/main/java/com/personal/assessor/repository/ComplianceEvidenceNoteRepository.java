package com.personal.assessor.repository;

import com.personal.assessor.domain.ComplianceEvidenceNote;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the ComplianceEvidenceNote entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComplianceEvidenceNoteRepository extends JpaRepository<ComplianceEvidenceNote, Long> {
    @Query("select distinct compliance_evidence_note from ComplianceEvidenceNote compliance_evidence_note left join fetch compliance_evidence_note.values")
    List<ComplianceEvidenceNote> findAllWithEagerRelationships();

    @Query("select compliance_evidence_note from ComplianceEvidenceNote compliance_evidence_note left join fetch compliance_evidence_note.values where compliance_evidence_note.id =:id")
    ComplianceEvidenceNote findOneWithEagerRelationships(@Param("id") Long id);

}
