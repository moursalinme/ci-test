package com.petstore.backend.service;

import java.util.List;

import com.petstore.backend.dto.request.PetRequest;
import com.petstore.backend.dto.response.PetResponse;

public interface PetService {

    List<PetResponse> getAllPets();

    PetResponse getPetById(Long id);

    PetResponse createPet(PetRequest pet);

    PetResponse updatePet(Long id, PetRequest pet);

    void deletePetById(Long id);
}
