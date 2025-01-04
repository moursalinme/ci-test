package com.petstore.backend.mapper;

import com.petstore.backend.dto.response.PetResponse;
import com.petstore.backend.entity.Pet;

public class Mapper {

    public static PetResponse toPetResponse(Pet pet) {
        return PetResponse.builder()
                .id(pet.getId())
                .name(pet.getName())
                .species(pet.getSpecies().getName())
                .age(pet.getAge())
                .breed(pet.getBreed())
                .gender(pet.getGender().name())
                .status(pet.getStatus().name())
                .version(pet.getVersion())
                .build();
    }

}
