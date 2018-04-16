package com.personal.assessor.repository;

import com.personal.assessor.domain.ComplianceFlag;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ComplianceFlag entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComplianceFlagRepository extends JpaRepository<ComplianceFlag, Long> {

}
