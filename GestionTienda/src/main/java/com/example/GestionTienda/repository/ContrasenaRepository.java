package com.example.GestionTienda.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.GestionTienda.model.Contrasena;

public interface ContrasenaRepository extends JpaRepository<Contrasena, Long>{
    
    @Query("select c from Contrasena c where c.pin = :pin")
    public Optional<Contrasena> findByPin(Integer pin);

}
