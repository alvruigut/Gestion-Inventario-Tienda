package com.example.GestionTienda.model;


import com.example.GestionTienda.util.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

import java.util.*;

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
    @Column(name = "beneficio")
    private double beneficio;


    
    @OneToMany( cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LineaCarrito> lineasCarrito ;

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

    public double calcularBeneficio(){
        return lineasCarrito.stream()
                .filter(linea -> linea.getbeneficio() != 0)
                .mapToDouble(LineaCarrito::getbeneficio)
                .sum();
    }



}
