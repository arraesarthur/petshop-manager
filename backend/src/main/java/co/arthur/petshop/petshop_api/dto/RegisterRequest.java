package co.arthur.petshop.petshop_api.dto;

import co.arthur.petshop.petshop_api.entity.Role;

public record RegisterRequest(String nomeCompleto, String email, String senha) {
}
