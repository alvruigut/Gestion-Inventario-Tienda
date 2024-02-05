package com.example.GestionTienda.Dto;

import com.example.GestionTienda.model.LineaCarrito;
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
    private Long id;
    private Producto producto;

    private double precio;
    private int cantidad;


    public static LineaCarritoDto of (LineaCarrito lc){
        return new LineaCarritoDto(
                lc.getId(),
                lc.getProducto(),

                lc.getProducto().getPrecio(),
                lc.getCantidad()
        );
    }

}
