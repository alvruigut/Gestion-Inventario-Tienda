package com.example.GestionTienda.model;

import com.example.GestionTienda.util.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Producto extends BaseEntity {

    @Column(name = "nombre")
    private String nombre;
    @Column(name = "precio")
    private double precio;
    @Column(name = "descripcion")
    private String descripcion;
    @Column(name = "imagen")
    private String imagen;
    @Column(name = "disponible")
    private boolean disponible;
    @ManyToOne
    @JoinColumn(name = "categoria_id",referencedColumnName = "id")
    private Categoria categoria;
    
}
