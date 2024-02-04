package com.example.GestionTienda.controller;

import java.util.List;

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


     @GetMapping("/{id}")
     public ResponseEntity<Producto> getProductById(@PathVariable("id") int id) {
          return new ResponseEntity<>(productoService.findById(id), HttpStatus.OK);
      }
    @GetMapping("/all")
    public ResponseEntity<List<Producto>> findall() {
        List<Producto> getProductoDtos = productoService.findAll();
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

    @GetMapping(value = "/nombre/{nombre}")
    public Producto getProductoByNombre(@PathVariable("nombre") String nombre) {
        return productoService.findByName(nombre);
    }

    @DeleteMapping("/eliminar/{nombre}")
    public ResponseEntity<String> eliminarProducto(@PathVariable String nombre) {
        try {
            productoService.eliminarProductoPorNombre(nombre);
            return new ResponseEntity<>("Producto eliminado exitosamente", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al eliminar el producto", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/categoria/{nombre}")
    public ResponseEntity<List<Producto>> getProductByCategoryName(@PathVariable("nombre") String nombre) {
        return new ResponseEntity<>(productoService.findByCategoryName(nombre), HttpStatus.OK);
    }
}
