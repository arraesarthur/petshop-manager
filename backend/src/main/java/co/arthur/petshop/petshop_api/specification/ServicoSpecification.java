package co.arthur.petshop.petshop_api.specification;

import co.arthur.petshop.petshop_api.entity.QServico;
import co.arthur.petshop.petshop_api.input.ServicoFilterInput;

import com.querydsl.core.BooleanBuilder;
import org.springframework.stereotype.Component;

@Component
public class ServicoSpecification {
    protected static final QServico qServico = QServico.servico;

    public BooleanBuilder addFilterCondition(BooleanBuilder where, ServicoFilterInput filter) {
        where.and(QServico.servico.ativo.isTrue());
        if (filter.getBusca() != null && !filter.getBusca().isBlank()) {
            where.and(
                    qServico.nome.containsIgnoreCase(filter.getBusca())
            );
        }
        return where;
    }
}