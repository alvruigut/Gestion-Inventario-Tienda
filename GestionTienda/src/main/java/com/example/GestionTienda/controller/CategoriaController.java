package com.example.GestionTienda.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @PutMapping("/editar/{nombre}")
    public ResponseEntity<Categoria> editarCategoria(@RequestBody Categoria c, @PathVariable("nombre") String nombre) {
        Categoria categoria = categoriaService.editarCategoria(c, nombre);
        return ResponseEntity.ok(categoria);
    }

    @DeleteMapping("/eliminar/{nombre}")
    public ResponseEntity<String> eliminarCategoria(@PathVariable("nombre") String nombre) {
        categoriaService.eliminaCategoria(nombre);
        return ResponseEntity.ok("Categoria eliminada");
    }

    @GetMapping("/nombre/{nombre}")
    public ResponseEntity<Categoria> buscarPorNombre(@PathVariable("nombre") String nombre) {
        Categoria categoria = categoriaService.buscarPorNombre(nombre);
        return ResponseEntity.ok(categoria);

    }

}
