package com.example.GestionTienda.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.GestionTienda.Dto.PostProductoDto;
import com.example.GestionTienda.model.Categoria;
import com.example.GestionTienda.model.Producto;
import com.example.GestionTienda.repository.CategoriaRepository;


@Service
public class CategoriaService {
    @Autowired
    private CategoriaRepository categoriaRepository;

    @Transactional(readOnly = true)
    public List<Categoria> listaDeCategorias() {
        return categoriaRepository.listaDeCategorias();
    }


    public Categoria nuevaCategoria(Categoria c){
        Categoria categoria = Categoria.builder()
             .nombre(c.getNombre())
             .build();
             return categoriaRepository.save(categoria);
       }
}
