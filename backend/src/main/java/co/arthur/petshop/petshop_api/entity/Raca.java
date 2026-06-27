package co.arthur.petshop.petshop_api.entity;

import co.arthur.petshop.petshop_api.enums.EspecieEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "raca")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Raca {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;

    @Enumerated(EnumType.STRING)
    private EspecieEnum especie;
}
