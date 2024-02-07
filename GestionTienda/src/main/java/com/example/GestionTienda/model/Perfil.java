package com.example.GestionTienda.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "perfil")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Perfil{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @OneToMany
    private List<Carrito> carrito;
    
}
