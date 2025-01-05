package com.petstore.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

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
import com.petstore.backend.repository.PetRepository;
import com.petstore.backend.service.impl.PetServiceImpl;

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
    void getPetById_InvalidPetId_ShouldReturnNull() {
        when(petRepository.findById(1L)).thenReturn(Optional.empty());

        PetResponse pet = petService.getPetById(1L);

        assertEquals(null, pet);
        verify(petRepository).findById(1L);
    }

    @Test
    void getPetById_NullPetId_ShouldReturnNull() {
        PetResponse pet = petService.getPetById(null);

        assertEquals(null, pet);
    }

}
