package co.arthur.petshop.petshop_api.config;

import co.arthur.petshop.petshop_api.entity.Usuario;
import co.arthur.petshop.petshop_api.enums.RoleEnum;
import co.arthur.petshop.petshop_api.repository.RoleRepository;
import co.arthur.petshop.petshop_api.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Set;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner init(
            UsuarioRepository repo,
            RoleRepository roleRepo,
            BCryptPasswordEncoder encoder
    ) {
        return args -> {

            var adminRole = roleRepo.findByNome(RoleEnum.ADMIN)
                    .orElseThrow(() -> new RuntimeException("Role ADMIN não encontrada"));

            if (repo.findByEmail("admin@petshop.com").isEmpty()) {

                var admin = new Usuario(
                        "Admin",
                        "admin@petshop.com",
                        encoder.encode("123456"),
                        Set.of(adminRole)
                );

                repo.save(admin);
            }
        };
    }
}