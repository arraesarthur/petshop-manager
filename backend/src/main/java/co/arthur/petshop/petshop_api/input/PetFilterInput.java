package co.arthur.petshop.petshop_api.input;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PetFilterInput {
    private String busca;
    private Long clienteId;
    private Integer size;
    private Integer page;
}

