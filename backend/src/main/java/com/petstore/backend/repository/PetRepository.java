package com.petstore.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.petstore.backend.entity.Pet;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {
    Page<Pet> findByNameContainingIgnoreCase(String name, Pageable pageable);
}
