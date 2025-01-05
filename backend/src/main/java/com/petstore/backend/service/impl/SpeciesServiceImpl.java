package com.petstore.backend.service.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.petstore.backend.entity.Species;
import com.petstore.backend.repository.SpeciesRepository;
import com.petstore.backend.service.SpeciesService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SpeciesServiceImpl implements SpeciesService {

    private final SpeciesRepository speciesRepository;

    @Override
    public Species getSpeciesByName(String name) {
        if (!StringUtils.hasText(name)) {
            throw new IllegalArgumentException("Name must not be null, empty, or whitespace");
        }

        Optional<Species> species = speciesRepository.findByName(name);

        if (species.isPresent()) {
            return species.get();
        }
        Species entity = Species.builder().name(name).build();
        entity = speciesRepository.save(entity);
        return entity;
    }

}
