package co.arthur.petshop.petshop_api.specification;

import co.arthur.petshop.petshop_api.entity.QPet;
import co.arthur.petshop.petshop_api.input.PetFilterInput;
import com.querydsl.core.BooleanBuilder;
import org.springframework.stereotype.Component;

@Component
public class PetSpecification {
    protected static final QPet qPet = QPet.pet;

    public BooleanBuilder addFilterCondition(BooleanBuilder where, PetFilterInput filter) {
        where.and(QPet.pet.ativo.isTrue());
        if(!filter.getBusca().isBlank()){
            where.and(
                    qPet.nome.containsIgnoreCase(filter.getBusca())
            );
        }
        if(filter.getClienteId() != null){
            where.and(
                    qPet.cliente.id.eq(filter.getClienteId())
            );
        }
        return where;
    }
}
