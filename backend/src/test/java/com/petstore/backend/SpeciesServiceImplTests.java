package com.petstore.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
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

import com.petstore.backend.entity.Species;
import com.petstore.backend.repository.SpeciesRepository;
import com.petstore.backend.service.impl.SpeciesServiceImpl;

@ExtendWith(MockitoExtension.class)
public class SpeciesServiceImplTests {

    @Mock
    private SpeciesRepository speciesRepository;

    @InjectMocks
    private SpeciesServiceImpl speciesService;

    private String name;
    private Species testSpecies;

    @BeforeEach
    void setUp() {
        name = "Test species";
        testSpecies = Species.builder()
                .id(1L)
                .name(name)
                .version(1)
                .build();
    }

    @Test
    void getSpeciesByName_ValidName_ShouldReturnSpecies() {

        when(speciesRepository.findByName(name)).thenReturn(Optional.empty());
        Species entity = Species.builder().name(name).build();
        when(speciesRepository.save(entity)).thenReturn(testSpecies);

        Species species = speciesService.getSpeciesByName(name);

        assertEquals(testSpecies, species);
        verify(speciesRepository).findByName(name);
        verify(speciesRepository).save(any(Species.class));
    }

    @Test
    void getSpeciesByName_AlreadyExists_ShouldReturnExistingSpecies() {
        when(speciesRepository.findByName(name)).thenReturn(Optional.of(testSpecies));

        Species species = speciesService.getSpeciesByName(name);

        assertEquals(testSpecies, species);
        verify(speciesRepository).findByName(name);
    }

    @Test
    void getSpeciesByName_NullName_ShouldThrowIllegalArgumentException() {
        assertThrows(IllegalArgumentException.class, () -> speciesService.getSpeciesByName(null));
    }

    @Test
    void getSpeciesByName_EmptyName_ShouldThrowIllegalArgumentException() {
        assertThrows(IllegalArgumentException.class, () -> speciesService.getSpeciesByName(""));
    }

    @Test
    void getSpeciesByName_WhitespaceName_ShouldThrowIllegalArgumentException() {
        assertThrows(IllegalArgumentException.class, () -> speciesService.getSpeciesByName(" "));
    }
}
