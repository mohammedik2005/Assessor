package com.personal.assessor.repository;

import com.personal.assessor.domain.ComplianceSchedule;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ComplianceSchedule entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComplianceScheduleRepository extends JpaRepository<ComplianceSchedule, Long> {

}
