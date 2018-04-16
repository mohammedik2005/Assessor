package com.personal.assessor.repository;

import com.personal.assessor.domain.ComplianceValues;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the ComplianceValues entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComplianceValuesRepository extends JpaRepository<ComplianceValues, Long> {
    @Query("select distinct compliance_values from ComplianceValues compliance_values left join fetch compliance_values.attachments")
    List<ComplianceValues> findAllWithEagerRelationships();

    @Query("select compliance_values from ComplianceValues compliance_values left join fetch compliance_values.attachments where compliance_values.id =:id")
    ComplianceValues findOneWithEagerRelationships(@Param("id") Long id);

}
