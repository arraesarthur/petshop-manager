package co.arthur.petshop.petshop_api.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "cliente")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cliente {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String telefone;
    private String instagram;
    private String endereco;

    @OneToMany(mappedBy = "cliente")
    private List<Pet> pets;

    @CreationTimestamp
    private Date dataCadastro;
    @UpdateTimestamp
    private Date dataAtualizacao;
    @Column(nullable = false)
    private Boolean ativo = true;
}
