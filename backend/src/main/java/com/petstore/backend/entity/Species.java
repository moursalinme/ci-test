package com.petstore.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Table(name = "species")
public class Species {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "species_id_seq")
    @SequenceGenerator(name = "species_id_seq", sequenceName = "species_id_seq", allocationSize = 50)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Version
    private Integer version;
}
