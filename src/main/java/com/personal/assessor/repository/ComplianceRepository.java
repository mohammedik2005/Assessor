package com.personal.assessor.repository;

import com.personal.assessor.domain.Compliance;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Compliance entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComplianceRepository extends JpaRepository<Compliance, Long> {
    @Query("select distinct compliance from Compliance compliance left join fetch compliance.values")
    List<Compliance> findAllWithEagerRelationships();

    @Query("select compliance from Compliance compliance left join fetch compliance.values where compliance.id =:id")
    Compliance findOneWithEagerRelationships(@Param("id") Long id);

}
