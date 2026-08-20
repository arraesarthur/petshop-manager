package co.arthur.petshop.petshop_api.controller.pet;

import co.arthur.petshop.petshop_api.entity.Pet;
import co.arthur.petshop.petshop_api.input.PetFilterInput;
import co.arthur.petshop.petshop_api.service.PetService;
import com.fasterxml.jackson.databind.ObjectMapper;
import graphql.schema.DataFetchingEnvironment;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
@RequiredArgsConstructor
public class PetQueryController {
    private final PetService service;
    private final ObjectMapper objectMapper;

    @QueryMapping(name = "pets")
    public Page<Pet> pets(DataFetchingEnvironment environment) {
        Map<String, Object> input =
                environment.getArgument("filterInput");

        PetFilterInput filter =
                objectMapper.convertValue(
                        input,
                        PetFilterInput.class
                );

        return service.findAll(filter);
    }

    @QueryMapping(name = "pet")
    public Pet pet(DataFetchingEnvironment environment){
        final long id = Long.parseLong(environment.getArgument("id"));
        return service.findById(id);
    }
}
