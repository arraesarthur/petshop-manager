package co.arthur.petshop.petshop_api.service;

import co.arthur.petshop.petshop_api.entity.Servico;
import co.arthur.petshop.petshop_api.input.ServicoFilterInput;
import co.arthur.petshop.petshop_api.input.ServicoInput;
import co.arthur.petshop.petshop_api.repository.ServicoRepository;
import co.arthur.petshop.petshop_api.specification.ServicoSpecification;
import com.querydsl.core.BooleanBuilder;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;

@ExtendWith(MockitoExtension.class)
class ServicoServiceTest {
    @Mock
    private ServicoRepository servicoRepository;
    @Mock
    private ServicoSpecification specification;
    @InjectMocks
    private ServicoService servicoService;

    @Test
    void deveriaAtualizarServico() {
        Servico servico = new Servico();
        ServicoInput input = new ServicoInput();

        input.setNome("Banho");
        input.setDescricao("Banho completo");
        input.setPrecoPequeno(new BigDecimal("10.00"));
        input.setPrecoMedio(new BigDecimal("20.00"));
        input.setPrecoGrande(new BigDecimal("30.00"));

        Servico resultado = servicoService.atualizar(servico, input);

        assertThat(resultado.getNome()).isEqualTo("Banho");
        assertThat(resultado.getDescricao()).isEqualTo("Banho completo");
        assertThat(resultado.getPrecoPequeno()).isEqualByComparingTo("10.00");
        assertThat(resultado.getPrecoMedio()).isEqualByComparingTo("20.00");
        assertThat(resultado.getPrecoGrande()).isEqualByComparingTo("30.00");
        verify(servicoRepository).save(servico);
    }

    @Test
    void deveriaRemoverServico() {
        Long id = 1L;

        Servico servico = new Servico();
        servico.setId(id);
        servico.setAtivo(true);

        when(servicoRepository.findByIdAndAtivoTrue(id)).thenReturn(Optional.of(servico));

        servicoService.remover(id);

        assertThat(servico.getAtivo()).isFalse();
        verify(servicoRepository).save(servico);
    }

    @Test
    void deveriaBuscarServicosComFiltroEPaginacao() {
        ServicoFilterInput filter = new ServicoFilterInput();
        filter.setPage(0);
        filter.setSize(10);

        Page<Servico> page = new PageImpl<>(List.of(new Servico()));

        when(servicoRepository.findAll(
                any(BooleanBuilder.class),
                any(Pageable.class)
        )).thenReturn(page);

        Page<Servico> resultado = servicoService.findAllPaged(filter);

        assertThat(resultado).isNotNull();
        assertThat(resultado.getContent()).hasSize(1);

        verify(specification).addFilterCondition(any(BooleanBuilder.class), eq(filter));
        verify(servicoRepository).findAll(any(BooleanBuilder.class), any(Pageable.class));
    }

    @Test
    void deveriaLancarExcecaoQuandoServicoNaoExistir() {
        Long id = 1L;
        when(servicoRepository.findByIdAndAtivoTrue(id)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> servicoService.remover(id));
    }
}