package com.example.GestionTienda.Dto;

import com.example.GestionTienda.model.Categoria;
import com.example.GestionTienda.model.Producto;



public record PostProductoDto(String imagen,
                              String nombre,
                              String descripcion,
                              double precio,
                              boolean disponible,
                              Categoria categoria,
                              int cantidadDisponible,
                              double pvp) {
    public static PostProductoDto of(Producto p){
        return new PostProductoDto(
                p.getImagen(),
                p.getNombre(),
                p.getDescripcion(),
                p.getPrecio(),
                p.isDisponible(),
                p.getCategoria(),
                p.getCantidadDisponible(),
                p.getPvp()
        );
    }

}
