package com.example.GestionTienda.model;

import com.example.GestionTienda.util.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class LineaCarrito extends BaseEntity {

    @ManyToOne
    @JsonIgnore
    private Carrito carrito;
    @ManyToOne
    private Producto producto;
    private int cantidad;

    public LineaCarrito(Producto producto, int cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }
    public void aumentarCantidad() {
        cantidad++;
    }

    public void disminuirCantidad() {
        cantidad--;
    }

    public double getTotal() {
        return producto.getPrecio() * cantidad;
    }

}
