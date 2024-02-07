package com.example.GestionTienda.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public  class CarritoDTO {
    private int cantidadProductos;
    private LocalDate fechaCreacion;
    private double total;
    private List<LineaCarritoAlvaroDTO> lineasCarrito;
}

