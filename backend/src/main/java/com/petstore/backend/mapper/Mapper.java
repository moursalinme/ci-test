package com.petstore.backend.mapper;

import java.time.LocalDate;
import java.time.Period;

import com.petstore.backend.dto.response.PetResponse;
import com.petstore.backend.entity.Pet;

public class Mapper {

    public static PetResponse toPetResponse(Pet pet) {
        return PetResponse.builder()
                .id(pet.getId())
                .name(pet.getName())
                .species(pet.getSpecies().getName())
                .age(calculateAge(pet.getBrithday()))
                .breed(pet.getBreed())
                .gender(pet.getGender().name())
                .status(pet.getStatus().name())
                .version(pet.getVersion())
                .build();
    }

    public static String calculateAge(LocalDate birthDate) {
        Period period = Period.between(birthDate, LocalDate.now());
        int years = period.getYears();
        int months = period.getMonths();

        if (years < 1) {
            return months + " month(s)";
        }
        return years + " year(s) and " + months + " month(s)";
    }

}
