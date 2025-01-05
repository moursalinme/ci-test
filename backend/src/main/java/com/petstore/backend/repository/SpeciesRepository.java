package com.petstore.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.petstore.backend.entity.Species;

public interface SpeciesRepository extends JpaRepository<Species, Long> {
    Optional<Species> findByName(String name);
}
