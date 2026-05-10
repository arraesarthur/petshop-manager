package co.arthur.petshop.petshop_api.controller;

import co.arthur.petshop.petshop_api.dto.LoginRequest;
import co.arthur.petshop.petshop_api.dto.LoginResponse;
import co.arthur.petshop.petshop_api.dto.RegisterRequest;
import co.arthur.petshop.petshop_api.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;


@RestController
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.login(loginRequest));
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterRequest registerRequest){
        authService.register(registerRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/google")
    public ResponseEntity<LoginResponse> loginWithGoogle(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        return ResponseEntity.ok(authService.authenticateWithGoogle(token));
    }

}
