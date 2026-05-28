package co.arthur.petshop.petshop_api.controller.cliente;


import co.arthur.petshop.petshop_api.entity.Cliente;
import co.arthur.petshop.petshop_api.input.ClienteInput;
import co.arthur.petshop.petshop_api.service.ClienteService;
import com.fasterxml.jackson.databind.ObjectMapper;
import graphql.schema.DataFetchingEnvironment;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.MutationMapping;

import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
@RequiredArgsConstructor
public class ClienteMutationController {
    private final ClienteService service;
    private final ObjectMapper objectMapper;

    @MutationMapping("salvarCliente")
    public Cliente salvarCliente(DataFetchingEnvironment environment) {
        Map<String, Object> input =
                environment.getArgument("filterInput");

        ClienteInput filter =
                objectMapper.convertValue(
                        input,
                        ClienteInput.class
                );
        Cliente cliente;

        if (filter.getId() != null) {
            cliente = service.findById(filter.getId());
        } else {
            cliente = new Cliente();
        }


        return service.atualizar(cliente, filter);
    }

    @MutationMapping("removerCliente")
    public void removerCliente(DataFetchingEnvironment environment){
        long id = Long.parseLong(environment.getArgument("id"));
        service.remover(id);
    }

}
