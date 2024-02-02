package com.example.GestionTienda.controller;

import java.util.List;

import com.example.GestionTienda.Dto.GetProductoDto;
import com.example.GestionTienda.Dto.PostProductoDto;
import com.example.GestionTienda.Dto.PutProductoDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @GetMapping("/all")
    public ResponseEntity<List<GetProductoDto>> findall() {
        List<GetProductoDto> getProductoDtos = productoService.findallDisponibles();
        return ResponseEntity.ok(getProductoDtos);
    }
    @PostMapping("/nuevo")
    public ResponseEntity<PostProductoDto> crearNuevoProducto(@RequestBody PostProductoDto postProductoDto) {
        PostProductoDto postProductoDto1 = productoService.crearNuevoProducto(postProductoDto);
        return ResponseEntity.ok(postProductoDto1);
    }


    @PutMapping("/actualizar/{nombre}")
    public ResponseEntity<Producto> actualizarProducto(@PathVariable("nombre") String nombre, @RequestBody PutProductoDto producto) {
        Producto productoEditado = productoService.editarProducto(nombre, producto);
        return productoEditado != null ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

}
