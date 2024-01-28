package com.example.GestionTienda.repository;

import com.example.GestionTienda.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria,Integer> {
    //Optional<Categoria> findById();
}
