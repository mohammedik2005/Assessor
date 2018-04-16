package com.personal.assessor.repository;

import com.personal.assessor.domain.ControlCategory;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the ControlCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ControlCategoryRepository extends JpaRepository<ControlCategory, Long> {
    @Query("select distinct control_category from ControlCategory control_category left join fetch control_category.controls")
    List<ControlCategory> findAllWithEagerRelationships();

    @Query("select control_category from ControlCategory control_category left join fetch control_category.controls where control_category.id =:id")
    ControlCategory findOneWithEagerRelationships(@Param("id") Long id);

}
