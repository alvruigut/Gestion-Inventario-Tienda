package com.example.GestionTienda.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PerfilDto {
    private String nombre;
    private double ingresos;
    private List<CarritoDTO> carritos;


}