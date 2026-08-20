package co.arthur.petshop.petshop_api.input;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ServicoFilterInput {
    private String busca;
    private Integer size;
    private Integer page;
}