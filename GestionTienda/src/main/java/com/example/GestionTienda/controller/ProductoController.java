package com.example.GestionTienda.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.GestionTienda.model.Producto;
import com.example.GestionTienda.service.ProductoService;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {
    @Autowired
    ProductoService productoService;



   @GetMapping(value = "/{id}") 
   public ResponseEntity<Producto> getProductById(@PathVariable("id") int id) {
		return new ResponseEntity<>(productoService.findById(id), HttpStatus.OK);
	}

    @GetMapping(value = "/all")
    public List<Producto> getAllProducts() {
        return productoService.findAll();
    }

}
