package com.example.GestionTienda.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.GestionTienda.model.Categoria;
import com.example.GestionTienda.service.CategoriaService;

@RestController
@RequestMapping("api/categorias")
public class CategoriaController {
    
    @Autowired
    private CategoriaService categoriaService;

    @GetMapping("/all")
    public List<Categoria> listaDeCategorias(){
        return categoriaService.listaDeCategorias();
    }

    @PostMapping("/nuevo")
    public ResponseEntity<Categoria> crearNuevaCategoria(@RequestBody Categoria c) {
        Categoria categoria = categoriaService.nuevaCategoria(c);
        return ResponseEntity.ok(categoria);
    }

}
