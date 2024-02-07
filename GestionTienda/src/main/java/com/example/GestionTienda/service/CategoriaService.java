package com.example.GestionTienda.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.GestionTienda.model.Categoria;
import com.example.GestionTienda.repository.CategoriaRepository;


@Service
public class CategoriaService {
    @Autowired
    private CategoriaRepository categoriaRepository;

    @Transactional(readOnly = true)
    public List<Categoria> listaDeCategorias() {
        return categoriaRepository.listaDeCategorias();
    }

    @Transactional(readOnly = true)
    public Categoria buscarPorNombre(String nombre) {
        return categoriaRepository.findByName(nombre);
    }


    public Categoria nuevaCategoria(Categoria c){
        Categoria categoria = Categoria.builder()
             .nombre(c.getNombre())
             .build();
             return categoriaRepository.save(categoria);
       }


    public Categoria editarCategoria(Categoria c,String nombre){
        Categoria categoriaExistente= categoriaRepository.findByName(nombre);
        if(categoriaExistente == null){
            throw new RuntimeException("La categoria no existe");
        }else{
            categoriaExistente.setNombre(c.getNombre());
            return categoriaRepository.save(categoriaExistente);
        }             
       }

    public void eliminaCategoria(String nombre){
        Categoria categoriaExistente= categoriaRepository.findByName(nombre);
        if(categoriaExistente == null){
            throw new RuntimeException("La categoria no existe");
        }else{
            categoriaRepository.eliminarCategoriaPorNombre(nombre);
        }             
       }
}
