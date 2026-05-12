package co.arthur.petshop.petshop_api.input;


import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ClienteInput {
    private Long id;
    private String nome;
    private String telefone;
    private String instagram;
    private String endereco;
}
