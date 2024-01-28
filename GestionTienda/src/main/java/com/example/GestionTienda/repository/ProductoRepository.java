package com.example.GestionTienda.repository;

import com.example.GestionTienda.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto,Integer> {
    
}
