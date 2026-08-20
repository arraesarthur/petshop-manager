package co.arthur.petshop.petshop_api.service;

import co.arthur.petshop.petshop_api.entity.Cliente;
import co.arthur.petshop.petshop_api.exception.NotFoundException;
import co.arthur.petshop.petshop_api.exception.VinculadoException;
import co.arthur.petshop.petshop_api.input.ClienteFilterInput;
import co.arthur.petshop.petshop_api.input.ClienteInput;
import co.arthur.petshop.petshop_api.repository.ClienteRepository;
import co.arthur.petshop.petshop_api.specification.ClienteSpecification;
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
public class ClienteService {
    private final ClienteRepository clienteRepository;
    private final ClienteSpecification clienteSpecification;

    public Page<Cliente> findAllPaged(ClienteFilterInput filter) {
        BooleanBuilder where = new BooleanBuilder();

        clienteSpecification.addFilterCondition(where, filter);
        Sort sortOrdemAlfabetica = Sort.by("nome").ascending();
        return clienteRepository.findAll(where, PageRequest.of(filter.getPage(), filter.getSize(), sortOrdemAlfabetica));
    }

    public List<Cliente> findAll() {
        return clienteRepository.findAllByAtivoTrue();
    }

    public Cliente findById(Long id) {
        return clienteRepository.findByIdAndAtivoTrue(id).orElseThrow(() -> new NotFoundException("Cliente", id));
    }

    public void remover(Long id) {
        Cliente cliente = findById(id);

        boolean temPetAtivo = cliente.getPets().stream()
                .anyMatch(pet -> Boolean.TRUE.equals(pet.getAtivo()));

        if (temPetAtivo) {
            throw new VinculadoException("Cliente", "Pet(s)");
        }

        cliente.setAtivo(false);
        clienteRepository.save(cliente);
    }

    @Transactional
    public Cliente atualizar(Cliente cliente, ClienteInput filter) {
        cliente.setNome(filter.getNome());
        cliente.setTelefone(filter.getTelefone());
        cliente.setInstagram(filter.getInstagram());
        cliente.setEndereco(filter.getEndereco());

        clienteRepository.save(cliente);
        return cliente;
    }
}
