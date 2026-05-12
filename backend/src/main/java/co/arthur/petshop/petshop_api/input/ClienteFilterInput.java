package co.arthur.petshop.petshop_api.input;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ClienteFilterInput{
    private String busca;
    private Integer size;
    private Integer page;
}

