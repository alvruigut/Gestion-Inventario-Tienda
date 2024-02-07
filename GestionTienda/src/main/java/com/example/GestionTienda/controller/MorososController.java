package com.example.GestionTienda.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.GestionTienda.service.MorososService;
import com.example.GestionTienda.model.Morosos;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.List;
@RestController
@RequestMapping("/api/morosos")
public class MorososController {
    
    @Autowired
    MorososService morososService;


    //listar todos los morosos
    @GetMapping("/all")
    public List<Morosos> findAll() {
        List<Morosos> morosos = morososService.findAll();
        return morosos;
    }

    //crear un nuevo moroso
    @PostMapping("/nuevo")
    public ResponseEntity<Morosos> crearMoroso(@RequestBody Morosos moroso) {
        Morosos moroso1 = morososService.crearMoroso(moroso);
        return ResponseEntity.ok(moroso1);
    }

    //editar un moroso
    @PutMapping("/actualizar/{nombre}")
    public ResponseEntity<Morosos> editarMoroso(@PathVariable("nombre") String nombre, @RequestBody Morosos moroso) {
        Morosos morosoEditado = morososService.editarMorosos(moroso, nombre);
        return morosoEditado != null ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    //eliminar un moroso
    @DeleteMapping("/eliminar/{nombre}")
    public ResponseEntity<String> eliminarMoroso(@PathVariable String nombre) {
        try {
            morososService.eliminarMoroso(nombre);
            return new ResponseEntity<>("Moroso eliminado exitosamente", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al eliminar el moroso", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    

}
