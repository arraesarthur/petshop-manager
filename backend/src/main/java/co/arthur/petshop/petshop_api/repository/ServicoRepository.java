package co.arthur.petshop.petshop_api.repository;

import co.arthur.petshop.petshop_api.entity.Servico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ServicoRepository extends JpaRepository<Servico, Long>, QuerydslPredicateExecutor<Servico> {

    Optional<Servico> findByIdAndAtivoTrue(@Param("id") Long id);

    List<Servico> findAllByAtivoTrue();
}