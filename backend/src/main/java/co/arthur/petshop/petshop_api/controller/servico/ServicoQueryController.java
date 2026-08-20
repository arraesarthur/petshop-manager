package co.arthur.petshop.petshop_api.controller.servico;

import co.arthur.petshop.petshop_api.entity.Servico;
import co.arthur.petshop.petshop_api.input.ServicoFilterInput;
import co.arthur.petshop.petshop_api.service.ServicoService;
import com.fasterxml.jackson.databind.ObjectMapper;
import graphql.schema.DataFetchingEnvironment;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class ServicoQueryController {
    private final ServicoService service;
    private final ObjectMapper objectMapper;

    @QueryMapping(name = "servicosPaged")
    public Page<Servico> servicosPaged(DataFetchingEnvironment environment) {
        Map<String, Object> input =
                environment.getArgument("filterInput");

        ServicoFilterInput filter =
                objectMapper.convertValue(
                        input,
                        ServicoFilterInput.class
                );

        return service.findAllPaged(filter);
    }

    @QueryMapping(name = "servicos")
    public List<Servico> servicos(DataFetchingEnvironment environment) {
        return service.findAll();
    }

    @QueryMapping(name = "servico")
    public Servico servico(DataFetchingEnvironment environment) {
        final long id = Long.parseLong(environment.getArgument("id"));
        return service.findById(id);
    }
}