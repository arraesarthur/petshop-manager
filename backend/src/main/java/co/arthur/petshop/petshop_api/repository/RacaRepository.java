package co.arthur.petshop.petshop_api.repository;

import co.arthur.petshop.petshop_api.entity.Raca;
import co.arthur.petshop.petshop_api.enums.EspecieEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RacaRepository extends JpaRepository<Raca, Long> {

    List<Raca> findAllByEspecie(EspecieEnum especie);
}
