package co.arthur.petshop.petshop_api.input;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClienteInput {
    private Long id;
    private String nome;
    private String telefone;
    private String instagram;
    private String endereco;
}
