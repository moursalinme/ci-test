package com.petstore.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.petstore.backend.dto.request.PetRequest;
import com.petstore.backend.dto.response.PetResponse;
import com.petstore.backend.entity.Pet;
import com.petstore.backend.entity.Species;
import com.petstore.backend.enums.PetGender;
import com.petstore.backend.enums.PetStatus;
import com.petstore.backend.mapper.Mapper;
import com.petstore.backend.repository.PetRepository;
import com.petstore.backend.service.impl.PetServiceImpl;

import jakarta.persistence.EntityNotFoundException;

@ExtendWith(MockitoExtension.class)
public class PetServiceImplTest {

    @Mock
    private PetRepository petRepository;

    @InjectMocks
    private PetServiceImpl petService;

    private Pet testPet;
    private PetRequest testPetRequest;
    private PetResponse testPetResponse;

    @BeforeEach
    void setUp() {
        testPet = Pet.builder()
                .id(1L)
                .name("Test Pet")
                .species(Species.builder().id(1L).name("Test species").build())
                .age(5)
                .gender(PetGender.MALE)
                .breed("Test breed")
                .status(PetStatus.AVAILABLE)
                .version(1)
                .build();

        testPetRequest = new PetRequest("Test Pet", "Test species", 5, "Test breed", PetGender.MALE,
                PetStatus.AVAILABLE);

        testPetResponse = new PetResponse(1L, "Test Pet", "Test species", 5, "Test breed", PetGender.MALE.toString(),
                PetStatus.AVAILABLE.toString(), 1);
    }

    @Test
    void createPet_ValidPetRequest_ShouuldRetunCreatedPet() {
        when(petRepository.save(any(Pet.class))).thenReturn(testPet);

        PetResponse createdPet = petService.createPet(testPetRequest);

        assertNotNull(createdPet);
        assertEquals(testPetResponse, createdPet);
        verify(petRepository).save(any(Pet.class));
    }

    @Test
    void getPetById_ValidPetId_ShouldReturnPet() {
        when(petRepository.findById(1L)).thenReturn(Optional.of(testPet));

        PetResponse pet = petService.getPetById(1L);

        assertNotNull(pet);
        assertEquals(testPetResponse, pet);
        verify(petRepository).findById(1L);
    }

    @Test
    void getPetById_InvalidPetId_ShouldThrowEntityNotFoundException() {
        when(petRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> petService.getPetById(1L));
        verify(petRepository).findById(1L);
    }

    @Test
    void getPetById_NullPetId_ShouldThrowIllegalArgumentException() {
        assertThrows(IllegalArgumentException.class, () -> petService.getPetById(null));
    }

    @Test
    void getPetById_NegativePetId_ShouldThrowIllegalArgumentException() {
        assertThrows(IllegalArgumentException.class, () -> petService.getPetById(-1L));
    }

    @Test
    void getAllPets_NoPets_ShouldReturnEmptyList() {
        when(petRepository.findAll()).thenReturn(Collections.emptyList());

        List<PetResponse> pets = petService.getAllPets();

        assertTrue(pets.isEmpty(), "Expected an empty list when no pets are available");
        verify(petRepository).findAll();
    }

    @Test
    void getAllPets_WithPets_ShouldReturnPetResponses() {
        List<Pet> petEntities = List.of(testPet, testPet);
        petEntities.get(1).setId(2L);
        when(petRepository.findAll()).thenReturn(petEntities);

        List<PetResponse> petResponses = petService.getAllPets();

        assertEquals(petEntities.size(), petResponses.size(), "Expected petResponses size to match petEntities size");
        assertEquals(Mapper.toPetResponse(testPet), petResponses.get(0));
        assertEquals(Mapper.toPetResponse(testPet), petResponses.get(1));
        verify(petRepository).findAll();
    }
}
