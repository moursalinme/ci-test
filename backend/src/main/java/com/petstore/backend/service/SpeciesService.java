package com.petstore.backend.service;

import com.petstore.backend.entity.Species;

public interface SpeciesService {

    Species getSpeciesByName(String name);
}
