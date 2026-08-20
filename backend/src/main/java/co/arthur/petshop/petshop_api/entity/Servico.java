package co.arthur.petshop.petshop_api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "servico")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Servico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String descricao;

    @Column(nullable = false)
    private BigDecimal precoPequeno;
    @Column(nullable = false)
    private BigDecimal precoMedio;
    @Column(nullable = false)
    private BigDecimal precoGrande;

    @CreationTimestamp
    private Date dataCadastro;
    @UpdateTimestamp
    private Date dataAtualizacao;
    @Column(nullable = false)
    private Boolean ativo = true;
}