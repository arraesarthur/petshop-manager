package co.arthur.petshop.petshop_api.controller.raca;

import co.arthur.petshop.petshop_api.entity.Raca;
import co.arthur.petshop.petshop_api.enums.EspecieEnum;
import co.arthur.petshop.petshop_api.repository.RacaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class RacaQueryController {
    private final RacaRepository repository;

    @QueryMapping(name = "racas")
    public List<Raca> racas(@Argument EspecieEnum especie) {
        if (especie == null) {
            return repository.findAll();
        }
        return repository.findAllByEspecie(especie);
    }
}