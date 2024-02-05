package com.example.GestionTienda.model;

import com.example.GestionTienda.util.BaseEntity;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@Setter
@Table(name = "categoria")
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Categoria  extends BaseEntity{

    @Column(name = "nombre")
    private String nombre;

    

}
