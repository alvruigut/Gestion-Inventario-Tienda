package com.example.GestionTienda.controller;

import com.example.GestionTienda.model.Producto;
import com.example.GestionTienda.service.CategoriaService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/categoria")
@RequiredArgsConstructor
public class CategoriaController {

    private final CategoriaService categoriaService;


    @GetMapping("/nombre/{nombre}")
    public ResponseEntity<List<Producto>> findByNombre(@PathVariable String nombre){
        List<Producto> productos = categoriaService.buscarPorNombreCategoria(nombre);
        return ResponseEntity.ok(productos);
    }

}
