package com.personal.assessor.repository;

import com.personal.assessor.domain.AssessmentSchedule;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the AssessmentSchedule entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AssessmentScheduleRepository extends JpaRepository<AssessmentSchedule, Long> {
    @Query("select distinct assessment_schedule from AssessmentSchedule assessment_schedule left join fetch assessment_schedule.schedules")
    List<AssessmentSchedule> findAllWithEagerRelationships();

    @Query("select assessment_schedule from AssessmentSchedule assessment_schedule left join fetch assessment_schedule.schedules where assessment_schedule.id =:id")
    AssessmentSchedule findOneWithEagerRelationships(@Param("id") Long id);

}
