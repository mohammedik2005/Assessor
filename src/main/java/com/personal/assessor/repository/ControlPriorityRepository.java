package com.personal.assessor.repository;

import com.personal.assessor.domain.ControlPriority;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ControlPriority entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ControlPriorityRepository extends JpaRepository<ControlPriority, Long> {

}
