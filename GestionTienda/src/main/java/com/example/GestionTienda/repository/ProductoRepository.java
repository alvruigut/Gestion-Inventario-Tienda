package com.example.GestionTienda.repository;

import com.example.GestionTienda.model.Producto;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto,Long> {
    public Producto findById(int id);
    public List<Producto> findAll();
}
