package com.personal.assessor.repository;

import com.personal.assessor.domain.Applicant;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Applicant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ApplicantRepository extends JpaRepository<Applicant, Long> {
    @Query("select distinct applicant from Applicant applicant left join fetch applicant.values")
    List<Applicant> findAllWithEagerRelationships();

    @Query("select applicant from Applicant applicant left join fetch applicant.values where applicant.id =:id")
    Applicant findOneWithEagerRelationships(@Param("id") Long id);

}
