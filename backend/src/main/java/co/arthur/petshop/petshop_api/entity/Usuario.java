package co.arthur.petshop.petshop_api.entity;

import co.arthur.petshop.petshop_api.dto.LoginRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "usuario")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome_completo")
    private String nomeCompleto;
    @Column(unique = true)
    private String email;
    private String senha;

    @ManyToMany()
    @JoinTable(
            name = "usuario_role",
            joinColumns = @JoinColumn(name = "usuario_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;

    @CreationTimestamp
    private Date dataCadastro;

    @UpdateTimestamp
    private Date dataAtualizacao;

    public boolean isLoginCorrect(LoginRequest loginRequest, PasswordEncoder passwordEncoder) {
        return passwordEncoder.matches(loginRequest.senha(), this.senha);
    }

    public Usuario(String nomeCompleto, String email, String senha, Set<Role> roles) {
        this.nomeCompleto = nomeCompleto;
        this.email = email;
        this.senha = senha;
        this.roles = roles;
    }
    public Usuario(String nomeCompleto, String email, Set<Role> roles) {
        this.nomeCompleto = nomeCompleto;
        this.email = email;
        this.roles = roles;
    }
}
