package com.example.GestionTienda.repository;

import com.example.GestionTienda.model.Categoria;

import jakarta.transaction.Transactional;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface CategoriaRepository extends JpaRepository<Categoria,Long> {

    @Query("select c from Categoria c ")
    public List<Categoria> listaDeCategorias();
    @Query("select c from Categoria c where c.nombre = :nombre")
    public Categoria findByName(String nombre);
    
    

    @Transactional
    @Modifying
    @Query("DELETE FROM Categoria c WHERE c.nombre = :nombre")
    void eliminarCategoriaPorNombre(@Param("nombre") String nombre);
}
