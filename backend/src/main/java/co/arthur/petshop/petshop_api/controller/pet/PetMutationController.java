package co.arthur.petshop.petshop_api.controller.pet;

import co.arthur.petshop.petshop_api.entity.Pet;
import co.arthur.petshop.petshop_api.input.PetInput;
import co.arthur.petshop.petshop_api.service.PetService;
import com.fasterxml.jackson.databind.ObjectMapper;
import graphql.schema.DataFetchingEnvironment;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
@RequiredArgsConstructor
public class PetMutationController {
    private final PetService service;
    private final ObjectMapper objectMapper;

    @MutationMapping("salvarPet")
    public Pet salvarPet(DataFetchingEnvironment environment) {
        Map<String, Object> input =
                environment.getArgument("filterInput");

        PetInput filter =
                objectMapper.convertValue(
                        input,
                        PetInput.class
                );
        Pet pet;

        if (filter.getId() != null) {
            pet = service.findById(filter.getId());
        } else {
            pet = new Pet();
        }

        return service.atualizar(pet, filter);
    }

    @MutationMapping("removerPet")
    public boolean removerPet(DataFetchingEnvironment environment) {
        long id = Long.parseLong(environment.getArgument("id"));
        service.remover(id);
        return true;
    }

}
