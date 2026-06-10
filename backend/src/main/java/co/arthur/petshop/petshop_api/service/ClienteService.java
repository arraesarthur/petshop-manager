package co.arthur.petshop.petshop_api.service;

import co.arthur.petshop.petshop_api.entity.Cliente;
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

@Service
@RequiredArgsConstructor
public class ClienteService {
    private final ClienteRepository clienteRepository;
    private final ClienteSpecification clienteSpecification;

    public Page<Cliente> findAll(ClienteFilterInput filter) {
        BooleanBuilder where = new BooleanBuilder();

        clienteSpecification.addFilterCondition(where, filter);
        Sort sortOrdemAlfabetica = Sort.by("nome").ascending();
        return clienteRepository.findAll(where, PageRequest.of(filter.getPage(), filter.getSize(), sortOrdemAlfabetica));
    }

    public Cliente findById(Long id) {
        return clienteRepository.findByIdAndAtivoTrue(id).orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
    }

    public void remover(Long id) {
        Cliente cliente = findById(id);
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
