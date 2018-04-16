package com.personal.assessor.repository;

import com.personal.assessor.domain.Principles;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Principles entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrinciplesRepository extends JpaRepository<Principles, Long> {

}
