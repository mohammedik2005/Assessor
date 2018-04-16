package com.personal.assessor.repository;

import com.personal.assessor.domain.ComplianceStatus;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ComplianceStatus entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComplianceStatusRepository extends JpaRepository<ComplianceStatus, Long> {

}
