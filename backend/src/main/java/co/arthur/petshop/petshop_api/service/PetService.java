package co.arthur.petshop.petshop_api.service;

import co.arthur.petshop.petshop_api.entity.Cliente;
import co.arthur.petshop.petshop_api.entity.Pet;
import co.arthur.petshop.petshop_api.entity.Raca;
import co.arthur.petshop.petshop_api.exception.NotFoundException;
import co.arthur.petshop.petshop_api.input.PetFilterInput;
import co.arthur.petshop.petshop_api.input.PetInput;
import co.arthur.petshop.petshop_api.repository.ClienteRepository;
import co.arthur.petshop.petshop_api.repository.PetRepository;
import co.arthur.petshop.petshop_api.repository.RacaRepository;
import co.arthur.petshop.petshop_api.specification.PetSpecification;
import com.querydsl.core.BooleanBuilder;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PetService {
    private final PetRepository petRepository;
    private final PetSpecification petSpecification;
    private final ClienteRepository clienteRepository;
    private final RacaRepository racaRepository;

    public Page<Pet> findAll(PetFilterInput filter) {
        BooleanBuilder where = new BooleanBuilder();

        petSpecification.addFilterCondition(where, filter);
        Sort sortOrdemAlfabetica = Sort.by("nome").ascending();
        return petRepository.findAll(where, PageRequest.of(filter.getPage(), filter.getSize(), sortOrdemAlfabetica));
    }

    public Pet findById(Long id) {
        return petRepository.findByIdAndAtivoTrue(id).orElseThrow(() -> new NotFoundException("Pet", id));
    }

    public void remover(Long id) {
        Pet pet = findById(id);
        pet.setAtivo(false);
        petRepository.save(pet);
    }

    @Transactional
    public Pet atualizar(Pet pet, PetInput filter) {
        Cliente cliente = clienteRepository.findByIdAndAtivoTrue(filter.getClienteId()).orElseThrow(() ->new NotFoundException("Cliente", filter.getClienteId()));
        Raca raca =  racaRepository.findById(filter.getRacaId()).orElseThrow(()-> new NotFoundException("Raça", filter.getRacaId()));

        pet.setNome(filter.getNome());
        pet.setSexo(filter.getSexo());
        pet.setPorte(filter.getPorte());
        pet.setEspecie(filter.getEspecie());
        pet.setObservacao(filter.getObservacao());
        pet.setDataNascimento(filter.getDataNascimento());
        pet.setCliente(cliente);
        pet.setRaca(raca);


        petRepository.save(pet);
        return pet;
    }
}
