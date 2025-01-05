package com.petstore.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.petstore.backend.dto.request.PetRequest;
import com.petstore.backend.dto.response.PetResponse;
import com.petstore.backend.entity.Pet;
import com.petstore.backend.mapper.Mapper;
import com.petstore.backend.repository.PetRepository;
import com.petstore.backend.service.PetService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PetServiceImpl implements PetService {

    private final PetRepository petRepository;

    @Override
    public List<PetResponse> getAllPets() {
        return petRepository.findAll().stream()
                .map(Mapper::toPetResponse)
                .toList();
    }

    @Override
    public PetResponse getPetById(Long id) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("Id is invalid or null");
        }
        return petRepository.findById(id)
                .map(Mapper::toPetResponse)
                .orElseThrow(() -> new EntityNotFoundException("Pet with id " + id + " not found"));
    }

    @Override
    public PetResponse createPet(PetRequest pet) {

        if (pet == null) {
            throw new IllegalArgumentException("PetRequest cannot be null");
        }

        Pet petEntity = Pet.builder()
                .name(pet.getName())
                .age(pet.getAge())
                .breed(pet.getBreed())
                .gender(pet.getGender())
                .status(pet.getStatus())
                .species(pet.getSpeciesEntity())
                .build();
        petEntity = petRepository.save(petEntity);
        return Mapper.toPetResponse(petEntity);
    }

    @Override
    public PetResponse updatePet(Long id, PetRequest pet) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updatePet'");
    }

    @Override
    public void deletePetById(Long id) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("Id is invalid or null");
        }
        boolean exists = petRepository.existsById(id);
        if (!exists) {
            throw new EntityNotFoundException("Pet with ID " + id + " not found");
        }
        petRepository.deleteById(id);
    }

}
