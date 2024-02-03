package com.example.GestionTienda.model;

import com.example.GestionTienda.service.CarritoService;
import com.example.GestionTienda.util.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
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

    @ManyToOne
    @JoinColumn(name = "producto_id",referencedColumnName = "id")
    private Producto producto;
    @Column(name = "precio")
    private double precio;
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
