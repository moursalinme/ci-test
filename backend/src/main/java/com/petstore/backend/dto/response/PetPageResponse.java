package com.petstore.backend.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PetPageResponse {

    private List<PetResponse> pets;
    private Integer pageSize;
    private Integer pageNo;
    private Integer totalPets;
    private Integer totalPages;

}
