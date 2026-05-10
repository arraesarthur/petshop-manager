package co.arthur.petshop.petshop_api.entity;

import co.arthur.petshop.petshop_api.enums.RoleEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

@Entity
@Table(name = "role")
@Getter
@Setter
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private RoleEnum nome;

    @CreationTimestamp
    private Date dataCadastro;

    @UpdateTimestamp
    private Date dataAtualizacao;

}
