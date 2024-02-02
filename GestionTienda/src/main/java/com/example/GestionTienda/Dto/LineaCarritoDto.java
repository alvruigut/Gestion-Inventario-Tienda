package com.example.GestionTienda.Dto;

import com.example.GestionTienda.model.Producto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LineaCarritoDto {
    private Producto producto;
    private double precio;
    private int cantidad;


    // constructores, getters y setters
}
