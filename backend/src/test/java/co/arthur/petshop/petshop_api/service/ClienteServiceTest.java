package co.arthur.petshop.petshop_api.service;

import co.arthur.petshop.petshop_api.entity.Cliente;
import co.arthur.petshop.petshop_api.input.ClienteFilterInput;
import co.arthur.petshop.petshop_api.input.ClienteInput;
import co.arthur.petshop.petshop_api.repository.ClienteRepository;
import co.arthur.petshop.petshop_api.specification.ClienteSpecification;
import com.querydsl.core.BooleanBuilder;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;

@ExtendWith(MockitoExtension.class)
 class ClienteServiceTest {
    @Mock
    private ClienteRepository clienteRepository;
    @Mock
    private ClienteSpecification specification;
    @InjectMocks
    private ClienteService clienteService;

    @Test
    void deveriaAtualizarCliente(){
        Cliente cliente = new Cliente();
        ClienteInput input = new ClienteInput();

        input.setNome("Arthur");
        input.setTelefone("11999999999");
         input.setEndereco("Rua Teste");
         input.setInstagram("@arthur");

        Cliente resultado = clienteService.atualizar(cliente, input);

        assertThat(resultado.getNome())
                .isEqualTo("Arthur");

        assertThat(resultado.getTelefone())
                .isEqualTo("11999999999");
        verify(clienteRepository).save(cliente);

    }

    @Test
    void deveriaRemoverCliente(){
        Long id = 1L;

        Cliente cliente = new Cliente();
        cliente.setId(id);
        cliente.setAtivo(true);

        when(clienteRepository.findByIdAndAtivoTrue(id)).thenReturn(Optional.of(cliente));

        clienteService.remover(id);

        assertThat(cliente.getAtivo())
                .isFalse();

        verify(clienteRepository).save(cliente);
    }

    @Test
    void deveriaBuscarClientesComFiltroEPaginacao() {
        ClienteFilterInput filter = new ClienteFilterInput();
        filter.setPage(0);
        filter.setSize(10);

        Page<Cliente> page = new PageImpl<>(List.of(new Cliente()));

        when(clienteRepository.findAll(
                any(BooleanBuilder.class),
                any(Pageable.class)
        )).thenReturn(page);

        Page<Cliente> resultado = clienteService.findAllPaged(filter);

        assertThat(resultado).isNotNull();
        assertThat(resultado.getContent()).hasSize(1);

        verify(specification).addFilterCondition(any(BooleanBuilder.class), eq(filter));
        verify(clienteRepository).findAll(any(BooleanBuilder.class), any(Pageable.class));

    }

    @Test
    void deveriaLancarExcecaoQuandoClienteNaoExistir() {
        Long id = 1L;
        when(clienteRepository.findByIdAndAtivoTrue(id)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> clienteService.remover(id));
    }

}
