package com.example.GestionTienda.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.GestionTienda.model.Perfil;
public interface PerfilRepository extends JpaRepository<Perfil, Long>{
    
    @Query("SELECT p FROM Perfil p WHERE p.nombre = 'Juan'")
    public Perfil findJuan();
}
