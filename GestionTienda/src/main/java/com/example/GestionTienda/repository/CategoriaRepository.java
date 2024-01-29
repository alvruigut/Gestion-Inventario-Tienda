package com.example.GestionTienda.repository;

import com.example.GestionTienda.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CategoriaRepository extends JpaRepository<Categoria,Long> {
    //Optional<Categoria> findById();
}
