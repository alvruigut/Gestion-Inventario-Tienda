package com.example.GestionTienda.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.GestionTienda.Dto.PerfilDto;
import com.example.GestionTienda.model.Perfil;
import com.example.GestionTienda.service.PerfilService;


@RestController
@RequestMapping("/perfil")
public class PerfilController {

    @Autowired
    private PerfilService perfilService;


  @GetMapping("/all")
    public PerfilDto findJuan() {
        PerfilDto perfil = perfilService.findJuan();
        return perfil;
    }
    @GetMapping("/all2")
    public Perfil findJuan2() {
        Perfil perfil = perfilService.findJuanPerfil();
        return perfil;
    }

    @PostMapping("/crearPerfil")
    public ResponseEntity<Perfil> crearPerfil(@RequestBody Perfil perfil){
        return ResponseEntity.ok(perfilService.crearPerfil(perfil));
    } 
    
    
}
