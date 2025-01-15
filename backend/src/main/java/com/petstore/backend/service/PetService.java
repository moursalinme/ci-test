package com.petstore.backend.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.petstore.backend.dto.request.PetRequest;
import com.petstore.backend.dto.response.PetResponse;

public interface PetService {

    List<PetResponse> getAllPets();

    Page<PetResponse> getPaginatedPets(Pageable pageable);

    PetResponse getPetById(Long id);

    PetResponse createPet(PetRequest pet);

    PetResponse updatePet(Long id, PetRequest pet);

    boolean deletePetById(Long id);

    Page<PetResponse> findPetsByName(String name, Pageable pageable);
}
