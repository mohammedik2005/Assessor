package com.personal.assessor.repository;

import com.personal.assessor.domain.Domain;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Domain entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DomainRepository extends JpaRepository<Domain, Long> {
    @Query("select distinct domain from Domain domain left join fetch domain.attachments")
    List<Domain> findAllWithEagerRelationships();

    @Query("select domain from Domain domain left join fetch domain.attachments where domain.id =:id")
    Domain findOneWithEagerRelationships(@Param("id") Long id);

}
