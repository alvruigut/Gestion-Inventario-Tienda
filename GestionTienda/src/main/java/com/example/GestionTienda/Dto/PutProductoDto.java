package com.example.GestionTienda.Dto;

import com.example.GestionTienda.model.Categoria;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PutProductoDto {
    
    private String imagen;
    private String nombre;
    private String descripcion;
    private double precio;
    private boolean disponible;
    private Categoria categoria;
    private int cantidadDisponible;

    public PutProductoDto(String imagen, String nombre, String descripcion, double precio, boolean disponible,Categoria categoria, int cantidadDisponible) {
        this.imagen = imagen;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.disponible = disponible;
        this.categoria = categoria;
        this.cantidadDisponible = cantidadDisponible;
    }

}
