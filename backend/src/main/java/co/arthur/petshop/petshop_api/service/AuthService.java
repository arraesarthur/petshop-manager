package co.arthur.petshop.petshop_api.service;

import co.arthur.petshop.petshop_api.dto.LoginRequest;
import co.arthur.petshop.petshop_api.dto.LoginResponse;
import co.arthur.petshop.petshop_api.dto.RegisterRequest;
import co.arthur.petshop.petshop_api.entity.Role;
import co.arthur.petshop.petshop_api.entity.Usuario;
import co.arthur.petshop.petshop_api.enums.RoleEnum;
import co.arthur.petshop.petshop_api.repository.RoleRepository;
import co.arthur.petshop.petshop_api.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Instant;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtEncoder jwtEncoder;
    private final RoleRepository roleRepository;
    private final WebClient webClient;

    public LoginResponse login(LoginRequest loginRequest) {
        var user = usuarioRepository.findByEmail(loginRequest.email());

        if(user.isEmpty() || !user.get().isLoginCorrect(loginRequest, bCryptPasswordEncoder)) {
            throw new BadCredentialsException("Usuário ou senha inválido.");
        }
        var now = Instant.now();
        var expiresIn = 86400L;
        var claims = JwtClaimsSet.builder()
                .issuer("backend")
                .subject(user.get().getId().toString())
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiresIn))
                .claim("roles", user.get().getRoles()
                        .stream()
                        .map(role -> role.getNome().name())
                        .toList())
                .build();

        var jwtValue = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

        return new LoginResponse(jwtValue, expiresIn);
    }

    public void register(RegisterRequest registerRequest) {
        var user = usuarioRepository.findByEmail(registerRequest.email());
        var roleUser = roleRepository.findByNome(RoleEnum.USER)
                .orElseThrow(() -> new RuntimeException("Role não encontrada"));

        if(user.isPresent()) {
            throw new RuntimeException("Usuário já existe");
        } else{
            var usuario = new Usuario();
            usuario.setNomeCompleto(registerRequest.nomeCompleto());
            usuario.setEmail(registerRequest.email());
            usuario.setSenha(bCryptPasswordEncoder.encode(registerRequest.senha()));
            usuario.setRoles(Set.of(roleUser));
            usuarioRepository.save(usuario);
        }
    }

    public LoginResponse authenticateWithGoogle(String token) {
        try {
            var roleUser = roleRepository.findByNome(RoleEnum.USER)
                    .orElseThrow(() -> new RuntimeException("Role não encontrada"));

            Map<String, Object> userInfo = webClient.get()
                    .uri("https://www.googleapis.com/oauth2/v3/userinfo")
                    .headers(headers -> headers.setBearerAuth(token))
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (userInfo == null || userInfo.get("email") == null) {
                throw new RuntimeException("Invalid Google token");
            }

            String email = (String) userInfo.get("email");
            String firstName = (String) userInfo.get("given_name");
            String lastName = (String) userInfo.get("family_name");

            String nomeCompleto = Stream.of(firstName, lastName)
                    .filter(Objects::nonNull)
                    .collect(Collectors.joining(" "));

            Usuario user = usuarioRepository.findByEmail(email)
                    .orElseGet(() -> createGoogleUser(email, nomeCompleto, Set.of(roleUser)));

            var now = Instant.now();
            var expiresIn = 86400L;

            var claims = JwtClaimsSet.builder()
                    .issuer("backend")
                    .subject(user.getId().toString())
                    .issuedAt(now)
                    .expiresAt(now.plusSeconds(expiresIn))
                    .claim("roles", user.getRoles()
                            .stream()
                            .map(role -> role.getNome().name())
                            .toList())
                    .build();

            var jwtValue = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

            return new LoginResponse(jwtValue, expiresIn);

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    private Usuario createGoogleUser(String email, String nomeCompleto, Set<Role> roles) {
        var usuario = new Usuario();
        usuario.setNomeCompleto(nomeCompleto);
        usuario.setEmail(email);
        usuario.setRoles(roles);
        return usuarioRepository.save(usuario);
    }
}
