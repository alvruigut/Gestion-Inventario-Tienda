package com.example.GestionTienda.model;

import com.example.GestionTienda.util.BaseEntity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "morosos")
public class Morosos extends BaseEntity{
    
    @Column(name = "nombre")
    @NonNull   
    private String nombre;

    @Column(name = "movil")
    private String movil;

    @Column(name = "precio")
    private Double precio;





    
}
