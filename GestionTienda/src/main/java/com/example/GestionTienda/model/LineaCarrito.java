package com.example.GestionTienda.model;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.example.GestionTienda.util.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
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
    @ManyToOne()
    @JoinColumn (name = "producto_id", referencedColumnName = "id")
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
        return producto.getPrecio() * cantidad; // Precio de venta por la cantidad
    }

   public double getbeneficio(){

        double costoTotal = producto.getPvp() * cantidad;// Costo total
        double ventaTotal = getTotal(); // Total de la venta
        double resultado = ventaTotal - costoTotal; // Beneficio
        return resultado;
    }

}
