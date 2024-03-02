package com.example.GestionTienda.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.GestionTienda.model.Contrasena;
import com.example.GestionTienda.service.ContrasenaService;

@RestController
@RequestMapping("/api/contrasena")
public class ContraController {
    
    @Autowired
    private ContrasenaService contrasenaService;
    //no srive
    @PostMapping("/nuevo")
    public ResponseEntity<Contrasena> crearContrasena(@RequestBody Contrasena contrasena) {
        Contrasena contrasena1 = contrasenaService.crearContrasena(contrasena.getPin());
        return ResponseEntity.ok(contrasena1);
    }

    @PutMapping("/editar/{pin}")
    public ResponseEntity<Contrasena> editarContrasena(@PathVariable Integer pin, @RequestBody Contrasena nuevopin) {
        Contrasena contrasena1 = contrasenaService.ediContrasena(pin, nuevopin);
        return ResponseEntity.ok(contrasena1);
    }

    @GetMapping("/all")
    public List<Contrasena> findAll(){
        return contrasenaService.findAll();
    }

    
}
