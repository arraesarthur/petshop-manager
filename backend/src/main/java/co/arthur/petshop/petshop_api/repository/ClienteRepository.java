package co.arthur.petshop.petshop_api.repository;

import co.arthur.petshop.petshop_api.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long>, QuerydslPredicateExecutor<Cliente> {

    Optional<Cliente> findByIdAndAtivoTrue(@Param("id") Long id);

    List<Cliente> findAllByAtivoTrue();
}
