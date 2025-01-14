package com.petstore.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.petstore.backend.controller.PetController;
import com.petstore.backend.dto.request.PetRequest;
import com.petstore.backend.dto.response.PetPageResponse;
import com.petstore.backend.dto.response.PetResponse;
import com.petstore.backend.entity.Species;
import com.petstore.backend.enums.PetGender;
import com.petstore.backend.enums.PetStatus;
import com.petstore.backend.service.PetService;
import com.petstore.backend.service.SpeciesService;

import jakarta.persistence.EntityNotFoundException;

@ExtendWith(MockitoExtension.class)
public class PetControllerTests {

    @Mock
    private PetService petService;

    @Mock
    private SpeciesService speciesService;

    @InjectMocks
    private PetController petController;

    private PetRequest testPetRequest;
    private PetResponse testPetResponse;
    private Species testSpecies;

    @BeforeEach
    void setUp() {
        testSpecies = Species.builder()
                .id(1L)
                .name("test species")
                .version(0)
                .build();

        testPetRequest = PetRequest.builder()
                .name("test pet")
                .species("test species")
                .birthday(LocalDate.now().minusYears(5).minusMonths(10))
                .breed("test breed")
                .gender(PetGender.MALE)
                .status(PetStatus.AVAILABLE)
                .build();

        testPetResponse = PetResponse.builder()
                .id(1L)
                .name("test pet")
                .species("test species")
                .age("5 year(s) and 10 month(s)")
                .breed("test breed")
                .gender("MALE")
                .status("AVAILABLE")
                .version(0)
                .build();
    }

    @Test
    void createPet_ValidPetRequest_ReturnsSuccess() {
        when(speciesService.getSpeciesByName(testPetRequest.getSpecies())).thenReturn(testSpecies);
        when(petService.createPet(testPetRequest)).thenReturn(testPetResponse);

        ResponseEntity<PetResponse> response = petController.createPet(testPetRequest);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(testPetResponse, response.getBody());
        verify(speciesService).getSpeciesByName(testSpecies.getName());
        testPetRequest.setSpeciesEntity(testSpecies);
        verify(petService).createPet(testPetRequest);
    }

    @Test
    void getPetById_ValidId_ReturnsSuccessWithPet() {
        when(petService.getPetById(1L)).thenReturn(testPetResponse);

        ResponseEntity<PetResponse> response = petController.getPetById(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(testPetResponse, response.getBody());
        verify(petService).getPetById(1L);
    }

    @Test
    void getPetById_NegativeId_ReturnsBadRequest() {

        ResponseEntity<PetResponse> response = petController.getPetById(-1L);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals(null, response.getBody());
    }

    @Test
    void getPetById_NullId_ReturnsBadRequest() {

        ResponseEntity<PetResponse> response = petController.getPetById(null);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals(null, response.getBody());
    }

    @Test
    void getPetById_InvalidId_ReturnsNotFound() {
        when(petService.getPetById(2L)).thenThrow(EntityNotFoundException.class);

        ResponseEntity<PetResponse> response = petController.getPetById(2L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals(null, response.getBody());
    }

    @Test
    void deletePet_ValidId_ReturnsNoContent() {
        when(petService.deletePetById(1L)).thenReturn(true);

        ResponseEntity<String> response = petController.deletePet(1L);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(petService, times(1)).deletePetById(1L);
    }

    @Test
    void deletePet_InvalidId() {
        ResponseEntity<String> response = petController.deletePet(0L);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    void deletePet_InternalError() {
        when(petService.deletePetById(1L)).thenReturn(false);

        ResponseEntity<String> response = petController.deletePet(1L);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        verify(petService).deletePetById(1L);
    }

    @Test
    void updatedPet_ValidPet_ReturnsSuccessWithUpdatedPet() {
        Species updatedSpecies = Species.builder()
                .id(2L)
                .name("update species")
                .version(0)
                .build();

        PetRequest petToUpdate = PetRequest.builder()
                .name("update pet")
                .species("update species")
                .birthday(LocalDate.now().minusYears(6).minusMonths(2))
                .breed("update breed")
                .gender(PetGender.FEMALE)
                .status(PetStatus.SOLD)
                .speciesEntity(updatedSpecies)
                .build();

        PetResponse updatePetResponse = PetResponse.builder()
                .id(1L)
                .name("update pet")
                .species("update species")
                .age("6 year(s) and 2 month(s)")
                .breed("update breed")
                .gender("FEMALE")
                .status("SOLD")
                .version(1)
                .build();

        when(speciesService.getSpeciesByName(updatedSpecies.getName())).thenReturn(updatedSpecies);

        when(petService.updatePet(1L, petToUpdate)).thenReturn(updatePetResponse);

        ResponseEntity<PetResponse> response = petController.updatePet(1L, petToUpdate);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        verify(speciesService).getSpeciesByName(updatedSpecies.getName());
        verify(petService).updatePet(1L, petToUpdate);
    }

    @Test
    void getPetsByPage_ValidiPage_ReturnsSuccess() {
        List<PetResponse> pets = Arrays.asList(testPetResponse, testPetResponse);
        Page<PetResponse> page = new PageImpl<>(pets);
        when(petService.getPaginatedPets(any(Pageable.class))).thenReturn(page);

        ResponseEntity<PetPageResponse> response = petController.getPetsByPage(1, 10);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().getPageNo());
        assertEquals(10, response.getBody().getPageSize());
        assertEquals(2, response.getBody().getPets().size());
        verify(petService).getPaginatedPets(any(Pageable.class));
    }

}
