package co.arthur.petshop.petshop_api.input;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ServicoInput {
    private Long id;
    private String nome;
    private String descricao;
    private BigDecimal precoPequeno;
    private BigDecimal precoMedio;
    private BigDecimal precoGrande;
}