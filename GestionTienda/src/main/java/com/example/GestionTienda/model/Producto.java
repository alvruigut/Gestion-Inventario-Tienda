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
@SuperBuilder
public class Producto extends BaseEntity {


    private String nombre;
    private double precio;
    private String descripcion;
    private String imagen;
    private boolean disponible;
    @ManyToOne
    @JoinColumn(name = "categoria_id",referencedColumnName = "id")
    private Categoria categoria;
    
}
