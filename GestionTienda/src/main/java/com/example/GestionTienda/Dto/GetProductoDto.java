package com.example.GestionTienda.Dto;

import com.example.GestionTienda.model.Categoria;

public record GetProductoDto (Long id,
        String imagen,
                              String nombre,
                              double precio,
                              String descripcion,
                              double pvp,
                              int cantidadDisponible,
                              Categoria categoria){
}
