package com.personal.assessor.repository;

import com.personal.assessor.domain.ComplianceEvidenceType;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ComplianceEvidenceType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComplianceEvidenceTypeRepository extends JpaRepository<ComplianceEvidenceType, Long> {

}
