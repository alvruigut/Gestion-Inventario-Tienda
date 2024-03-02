package com.example.GestionTienda.model;

import com.example.GestionTienda.util.BaseEntity;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@Setter


public class Contrasena extends BaseEntity{

    @Column(name = "pin")
    private Integer pin;

    

}
