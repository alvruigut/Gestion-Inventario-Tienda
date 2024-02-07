package com.example.GestionTienda.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.GestionTienda.model.Morosos;

import jakarta.transaction.Transactional;

import java.util.List;


public interface MorososRepository extends JpaRepository<Morosos, Long>{

@Query("select p from Morosos p")
public List<Morosos> findAll2();
    
    @Transactional
    @Modifying
    @Query("DELETE FROM Morosos p WHERE p.nombre = :nombre")
    void eliminarPorNombre(@Param("nombre") String nombre);

    @Query("select p from Morosos p where p.nombre = :nombre")
    public Morosos findByName(String nombre);
} 
