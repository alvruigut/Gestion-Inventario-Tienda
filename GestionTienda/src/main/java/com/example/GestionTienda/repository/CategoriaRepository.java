package com.example.GestionTienda.repository;

import com.example.GestionTienda.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


public interface CategoriaRepository extends JpaRepository<Categoria,Long> {
    //Optional<Categoria> findById();
}
