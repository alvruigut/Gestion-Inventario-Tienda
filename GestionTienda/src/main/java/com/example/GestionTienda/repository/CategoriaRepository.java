package com.example.GestionTienda.repository;

import com.example.GestionTienda.model.Categoria;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface CategoriaRepository extends JpaRepository<Categoria,Long> {

    @Query("select c from Categoria c ")
    public List<Categoria> listaDeCategorias();
    @Query("select c from Categoria c where c.nombre = :nombre")
    public Categoria findByName(String nombre);
}
