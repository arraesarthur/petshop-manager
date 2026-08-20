package co.arthur.petshop.petshop_api.service;

import co.arthur.petshop.petshop_api.entity.Servico;
import co.arthur.petshop.petshop_api.exception.NotFoundException;
import co.arthur.petshop.petshop_api.input.ServicoFilterInput;
import co.arthur.petshop.petshop_api.input.ServicoInput;
import co.arthur.petshop.petshop_api.repository.ServicoRepository;
import co.arthur.petshop.petshop_api.specification.ServicoSpecification;
import com.querydsl.core.BooleanBuilder;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ServicoService {
    private final ServicoRepository servicoRepository;
    private final ServicoSpecification servicoSpecification;

    public Page<Servico> findAllPaged(ServicoFilterInput filter) {
        BooleanBuilder where = new BooleanBuilder();

        servicoSpecification.addFilterCondition(where, filter);
        Sort sortOrdemAlfabetica = Sort.by("nome").ascending();
        return servicoRepository.findAll(where, PageRequest.of(filter.getPage(), filter.getSize(), sortOrdemAlfabetica));
    }

    public List<Servico> findAll() {
        return servicoRepository.findAllByAtivoTrue();
    }

    public Servico findById(Long id) {
        return servicoRepository.findByIdAndAtivoTrue(id).orElseThrow(() -> new NotFoundException("Servico", id));
    }

    public void remover(Long id) {
        Servico servico = findById(id);

        servico.setAtivo(false);
        servicoRepository.save(servico);
    }

    @Transactional
    public Servico atualizar(Servico servico, ServicoInput filter) {
        servico.setNome(filter.getNome());
        servico.setDescricao(filter.getDescricao());
        servico.setPrecoPequeno(filter.getPrecoPequeno());
        servico.setPrecoMedio(filter.getPrecoMedio());
        servico.setPrecoGrande(filter.getPrecoGrande());

        servicoRepository.save(servico);
        return servico;
    }
}