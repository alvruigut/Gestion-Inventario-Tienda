package com.example.GestionTienda.model;


import com.example.GestionTienda.util.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

import java.util.HashSet;

import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "carrito")
@Builder
public class Carrito extends BaseEntity{

    @Column(name = "cantidad")
    private Integer cantidad;


    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    @Column(name = "total")
    private double total;
    
    @OneToMany(mappedBy = "carrito", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<LineaCarrito> lineasCarrito = new HashSet<>();

    public void agregarProducto(Producto producto) {
        LineaCarrito nuevaLinea = new LineaCarrito(producto, 1);
        nuevaLinea.setCarrito(this);
        lineasCarrito.add(nuevaLinea);
    }

    public double calcularTotal() {
        return lineasCarrito.stream()
                .mapToDouble(LineaCarrito::getTotal)
                .sum();
    }


}
