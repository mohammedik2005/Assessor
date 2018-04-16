package com.personal.assessor.repository;

import com.personal.assessor.domain.ComplianceEvidenceStatus;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ComplianceEvidenceStatus entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComplianceEvidenceStatusRepository extends JpaRepository<ComplianceEvidenceStatus, Long> {

}
