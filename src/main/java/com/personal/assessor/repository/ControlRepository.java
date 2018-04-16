package com.personal.assessor.repository;

import com.personal.assessor.domain.Control;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Control entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ControlRepository extends JpaRepository<Control, Long> {
    @Query("select distinct control from Control control left join fetch control.attachments")
    List<Control> findAllWithEagerRelationships();

    @Query("select control from Control control left join fetch control.attachments where control.id =:id")
    Control findOneWithEagerRelationships(@Param("id") Long id);

}
