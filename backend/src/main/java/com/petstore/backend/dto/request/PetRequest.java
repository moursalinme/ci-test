package com.petstore.backend.dto.request;

import com.petstore.backend.enums.PetGender;
import com.petstore.backend.enums.PetStatus;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
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

    @NotNull(message = "Age is required")
    @Positive(message = "Age must be a positive number")
    private Integer age;

    @NotBlank(message = "Breed is required")
    private String breed;

    @NotNull(message = "Gender is required")
    private PetGender gender;

    @NotNull(message = "Status is required")
    private PetStatus status;
}
