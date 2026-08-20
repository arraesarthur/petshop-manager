package co.arthur.petshop.petshop_api.input;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClienteFilterInput{
    private String busca;
    private Integer size;
    private Integer page;
}

