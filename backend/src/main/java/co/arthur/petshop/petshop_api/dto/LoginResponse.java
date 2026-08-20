package co.arthur.petshop.petshop_api.dto;

public record LoginResponse(String accessToken, long expiresIn, String nomeCompleto, String email) {
}
