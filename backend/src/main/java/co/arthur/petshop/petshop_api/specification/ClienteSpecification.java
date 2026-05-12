package co.arthur.petshop.petshop_api.specification;

import co.arthur.petshop.petshop_api.entity.QCliente;
import co.arthur.petshop.petshop_api.input.ClienteFilterInput;

import com.querydsl.core.BooleanBuilder;
import org.springframework.stereotype.Component;

@Component
public class ClienteSpecification {
    protected static final QCliente qCliente = QCliente.cliente;

    public BooleanBuilder addFilterCondition(BooleanBuilder where, ClienteFilterInput filter) {
        if(!filter.getBusca().isBlank()){
            where.and(
                    qCliente.nome.containsIgnoreCase(filter.getBusca())
            );
        }
        return where;
    }
}
