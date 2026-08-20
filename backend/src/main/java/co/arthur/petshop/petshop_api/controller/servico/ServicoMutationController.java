package co.arthur.petshop.petshop_api.controller.servico;

import co.arthur.petshop.petshop_api.entity.Servico;
import co.arthur.petshop.petshop_api.input.ServicoInput;
import co.arthur.petshop.petshop_api.service.ServicoService;
import com.fasterxml.jackson.databind.ObjectMapper;
import graphql.schema.DataFetchingEnvironment;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
@RequiredArgsConstructor
public class ServicoMutationController {
    private final ServicoService service;
    private final ObjectMapper objectMapper;

    @MutationMapping("salvarServico")
    public Servico salvarServico(DataFetchingEnvironment environment) {
        Map<String, Object> input =
                environment.getArgument("filterInput");

        ServicoInput filter =
                objectMapper.convertValue(
                        input,
                        ServicoInput.class
                );
        Servico servico;

        if (filter.getId() != null) {
            servico = service.findById(filter.getId());
        } else {
            servico = new Servico();
        }

        return service.atualizar(servico, filter);
    }

    @MutationMapping("removerServico")
    public boolean removerServico(DataFetchingEnvironment environment) {
        long id = Long.parseLong(environment.getArgument("id"));
        service.remover(id);
        return true;
    }
}