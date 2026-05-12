package co.arthur.petshop.petshop_api.controller.cliente;


import co.arthur.petshop.petshop_api.entity.Cliente;
import co.arthur.petshop.petshop_api.input.ClienteFilterInput;
import co.arthur.petshop.petshop_api.service.ClienteService;
import com.fasterxml.jackson.databind.ObjectMapper;
import graphql.schema.DataFetchingEnvironment;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.graphql.data.method.annotation.QueryMapping;

import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
@RequiredArgsConstructor
public class ClienteQueryController {
    private final ClienteService service;
    private final ObjectMapper objectMapper;

    @QueryMapping(name = "clientes")
    public Page<Cliente> clientes(DataFetchingEnvironment environment) {
        Map<String, Object> input =
                environment.getArgument("filterInput");

        ClienteFilterInput filter =
                objectMapper.convertValue(
                        input,
                        ClienteFilterInput.class
                );

        return service.findAll(filter);
    }

    @QueryMapping(name = "cliente")
    public Cliente cliente(DataFetchingEnvironment environment){
        final long id = Long.parseLong(environment.getArgument("id"));
        return service.findById(id);

    }
}
