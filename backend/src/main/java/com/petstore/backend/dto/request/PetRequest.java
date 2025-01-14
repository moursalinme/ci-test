package com.petstore.backend.dto.request;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.petstore.backend.entity.Species;
import com.petstore.backend.enums.PetGender;
import com.petstore.backend.enums.PetStatus;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PetRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Species is required")
    private String species;

    @NotNull(message = "Birthday is required")
    @Past(message = "Birthday must be a past date")
    private LocalDate birthday;

    @NotBlank(message = "Breed is required")
    private String breed;

    @NotNull(message = "Gender is required")
    private PetGender gender;

    @NotNull(message = "Status is required")
    private PetStatus status;

    private Integer version;

    @JsonIgnore
    private Species speciesEntity;
}
