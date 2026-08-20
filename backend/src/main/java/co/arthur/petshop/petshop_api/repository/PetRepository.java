package co.arthur.petshop.petshop_api.repository;

import co.arthur.petshop.petshop_api.entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long>, QuerydslPredicateExecutor<Pet> {

    Optional<Pet> findByIdAndAtivoTrue(@Param("id") Long id);
}
