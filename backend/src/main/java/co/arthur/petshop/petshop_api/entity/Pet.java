package co.arthur.petshop.petshop_api.entity;

import co.arthur.petshop.petshop_api.enums.EspecieEnum;
import co.arthur.petshop.petshop_api.enums.PorteEnum;
import co.arthur.petshop.petshop_api.enums.SexoEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "pet")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    @Enumerated(EnumType.STRING)
    private EspecieEnum especie;
    @ManyToOne
    @JoinColumn(name = "raca_id")
    private Raca raca;
    @Enumerated(EnumType.STRING)
    private SexoEnum sexo;
    @Enumerated(EnumType.STRING)
    private PorteEnum porte;
    private LocalDate dataNascimento;
    private String observacao;
    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    @CreationTimestamp
    private Date dataCadastro;
    @UpdateTimestamp
    private Date dataAtualizacao;
    @Column(nullable = false)
    private Boolean ativo = true;

}
