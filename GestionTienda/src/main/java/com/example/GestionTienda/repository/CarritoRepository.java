package com.example.GestionTienda.repository;


import com.example.GestionTienda.service.CarritoService;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.GestionTienda.model.Carrito;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CarritoRepository extends JpaRepository<Carrito,Long>{
    @Query("select c from Carrito c where c.id = ?1")
    Optional<Carrito> comprobarId(Long id);








}
