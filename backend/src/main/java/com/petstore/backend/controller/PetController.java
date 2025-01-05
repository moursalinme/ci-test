package com.petstore.backend.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.petstore.backend.dto.request.PetRequest;
import com.petstore.backend.dto.response.PetPageResponse;
import com.petstore.backend.dto.response.PetResponse;
import com.petstore.backend.service.PetService;
import com.petstore.backend.service.SpeciesService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class PetController {

    private final PetService petService;
    private final SpeciesService speciesService;

    // @GetMapping("/pets")
    // public ResponseEntity<List<PetResponse>> getAllPets() {
    // List<PetResponse> pets = petService.getAllPets();
    // return ResponseEntity.ok().body(pets);
    // }

    @GetMapping("/pets/{page}")
    public ResponseEntity<PetPageResponse> getPetsByPage(@PathVariable int page,
            @RequestParam(defaultValue = "10") int size) {

        if (page <= 0 || size <= 0) {
            return ResponseEntity.badRequest().build();
        }

        size = Math.min(size, 100);

        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("id"));

        Page<PetResponse> response = petService.getPaginatedPets(pageable);

        if (response.getTotalPages() < page) {
            return ResponseEntity.badRequest().build();
        }

        PetPageResponse petPageResponse = PetPageResponse.builder()
                .pageNo(page)
                .pageSize(size)
                .totalPages(response.getTotalPages())
                .totalPets(Math.toIntExact(response.getTotalElements()))
                .pets(response.getContent())
                .build();

        return ResponseEntity.ok().body(petPageResponse);
    }

    @GetMapping("/pets/{id}")
    public ResponseEntity<PetResponse> getPetById(@PathVariable Long id) {
        if (id == null || id < 1) {
            return ResponseEntity.badRequest().body(null);
        }
        PetResponse pet;
        try {
            pet = petService.getPetById(id);
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(pet);
    }

    @PostMapping("/pets")
    public ResponseEntity<PetResponse> createPet(@RequestBody PetRequest pet) {
        pet.setSpeciesEntity(speciesService.getSpeciesByName(pet.getSpecies()));

        PetResponse createdPet = petService.createPet(pet);
        return ResponseEntity.ok().body(createdPet);
    }

    @PatchMapping("/pets/{id}")
    public ResponseEntity<PetResponse> updatePet(@PathVariable Long id, @RequestBody PetRequest pet) {
        pet.setSpeciesEntity(speciesService.getSpeciesByName(pet.getSpecies()));

        PetResponse updatedPet = petService.updatePet(id, pet);
        return ResponseEntity.ok().body(updatedPet);
    }

    @DeleteMapping("/pets/{id}")
    public ResponseEntity<String> deletePet(@PathVariable Long id) {
        if (id == null || id < 1) {
            return ResponseEntity.badRequest().body("Invalid Id.");
        }
        boolean deleted = petService.deletePetById(id);
        if (!deleted)
            return ResponseEntity.internalServerError().build();
        return ResponseEntity.noContent().build();
    }

}
