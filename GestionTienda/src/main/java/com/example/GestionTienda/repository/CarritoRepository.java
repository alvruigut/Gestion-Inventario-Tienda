package com.example.GestionTienda.repository;


import com.example.GestionTienda.service.CarritoService;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.example.GestionTienda.model.Carrito;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CarritoRepository extends JpaRepository<Carrito,Long>{
    @Query("select c from Carrito c where c.id = ?1")
    Optional<Carrito> comprobarId(Long id);


    
    
    @Transactional
    @Modifying
    @Query("DELETE FROM Carrito p WHERE p.id = :id")
    void eliminarPorId(@Param("id") Long id);





}
