package com.example.GestionTienda.controller;

import java.util.List;
import java.util.Map;

import com.example.GestionTienda.Dto.PostProductoDto;
import com.example.GestionTienda.Dto.PutProductoDto;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.GestionTienda.model.Producto;
import com.example.GestionTienda.service.ProductoService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
@RestController
@RequestMapping("/api/productos")
public class ProductoController {
    @Autowired
    ProductoService productoService;

    @PostMapping("/upload")
public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
    try {
        String currentDir = System.getProperty("user.dir");
        String relativePath = "frontend\\public\\";
        String folderPath = Paths.get(currentDir, relativePath).toString();

        Path path = Paths.get(folderPath, file.getOriginalFilename());
        System.out.println(folderPath);
        Files.write(path, file.getBytes());

        return new ResponseEntity<>(file.getOriginalFilename(), HttpStatus.OK);

    } catch (IOException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
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
            Producto producto = productoService.findByName(nombre);
            producto.setDisponible(false);
            return new ResponseEntity<>("Error al eliminar el producto", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/categoria/{nombre}")
    public ResponseEntity<List<Producto>> getProductByCategoryName(@PathVariable("nombre") String nombre) {
        return new ResponseEntity<>(productoService.findByCategoryName(nombre), HttpStatus.OK);
    }

    @GetMapping("/cantidad")
    public ResponseEntity<Map<String,Integer>> cantidadProductosPorCategoria() {
        return new ResponseEntity<>(productoService.listaDeCategorias(), HttpStatus.OK);
    }
}
