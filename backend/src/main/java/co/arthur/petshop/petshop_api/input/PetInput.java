package co.arthur.petshop.petshop_api.input;

import co.arthur.petshop.petshop_api.enums.EspecieEnum;
import co.arthur.petshop.petshop_api.enums.PorteEnum;
import co.arthur.petshop.petshop_api.enums.SexoEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PetInput {
    private Long id;
    private String nome;
    private EspecieEnum especie;
    private Long racaId;
    private SexoEnum sexo;
    private PorteEnum porte;
    private String observacao;
    private Long clienteId;
    private LocalDate dataNascimento;
}
