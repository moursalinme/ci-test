package com.petstore.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.petstore.backend.dto.request.PetRequest;
import com.petstore.backend.dto.response.PetResponse;
import com.petstore.backend.service.PetService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class PetController {

    private final PetService petService;

    @GetMapping("/pets")
    public List<PetResponse> getAllPets() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAllPets'");
    }

    @GetMapping("/pets/{id}")
    public PetResponse getPetById(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getPetById'");
    }

    @PostMapping("/pets")
    public PetResponse createPet(PetRequest pet) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createPet'");
    }

    @PostMapping("/pets/{id}")
    public PetResponse updatePet(Long id, PetRequest pet) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updatePet'");
    }

    @DeleteMapping("/pets/{id}")
    public void deletePet(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deletePet'");
    }

}
