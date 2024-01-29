package com.example.GestionTienda.Dto;

import com.example.GestionTienda.model.Categoria;
import com.example.GestionTienda.model.Producto;

import java.util.List;
import java.util.Locale;

public record PostProductoDto(String imagen,
                              String nombre,
                              String descripcion,
                              double precio,
                              boolean disponible,
                              Categoria categoria) {
    public static PostProductoDto of(Producto p){
        return new PostProductoDto(
                p.getImagen(),
                p.getNombre(),
                p.getDescripcion(),
                p.getPrecio(),
                p.isDisponible(),
                p.getCategoria()
        );
    }

}
