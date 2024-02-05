package com.example.GestionTienda.model;
import java.util.List;
import jakarta.persistence.OneToMany;

public class Inventario{

    @OneToMany
    private List<Producto> productos;


}
