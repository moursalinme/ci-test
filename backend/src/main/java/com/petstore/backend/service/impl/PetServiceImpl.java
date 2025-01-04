package com.petstore.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.petstore.backend.dto.request.PetRequest;
import com.petstore.backend.dto.response.PetResponse;
import com.petstore.backend.service.PetService;

@Service
public class PetServiceImpl implements PetService {

    @Override
    public List<PetResponse> getAllPets() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAllPets'");
    }

    @Override
    public PetResponse getPetById(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getPetById'");
    }

    @Override
    public PetResponse createPet(PetRequest pet) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createPet'");
    }

    @Override
    public PetResponse updatePet(Long id, PetRequest pet) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updatePet'");
    }

    @Override
    public void deletePet(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deletePet'");
    }

}
