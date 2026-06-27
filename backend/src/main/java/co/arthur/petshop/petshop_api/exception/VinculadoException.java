package co.arthur.petshop.petshop_api.exception;

public class VinculadoException extends RuntimeException {
    public VinculadoException(String entidade, String  vinculo) {
        super(entidade + " possui " + vinculo + " relacionado(s), por favor remova-os primeiro.");
    }
}
