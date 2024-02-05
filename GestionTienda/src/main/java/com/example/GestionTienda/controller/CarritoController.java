package com.example.GestionTienda.controller;
import com.example.GestionTienda.Dto.LineaCarritoDto;

import com.example.GestionTienda.model.Carrito;
import com.example.GestionTienda.model.Producto;
import com.example.GestionTienda.repository.CarritoRepository;
import com.example.GestionTienda.service.CarritoService;
import com.example.GestionTienda.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/carrito")
public class CarritoController {

    @Autowired
    private CarritoService carritoService;
    @Autowired
    private CarritoRepository carritoRepository;

    @Autowired
    private ProductoService productoService;

    @GetMapping("/all/carritos")
    public ResponseEntity<List<Map<String, Object>>> findAll() {
        List<Carrito> carritos = carritoService.findAllTodosLosCarritos();
        List<Map<String, Object>> response = carritos.stream().map(carrito -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", carrito.getId());
            map.put("Fecha Creacion", LocalDateTime.now());
            map.put("Cantidad de productos", carrito.getCantidad());
            map.put("total", carrito.calcularTotal());
            return map;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }


    @PostMapping("/new")
    public ResponseEntity<Carrito> crearUnoNuevo(){
        Carrito carrito = carritoService.crearUnCarrito();
        return ResponseEntity.ok(carrito);
    }

    @PostMapping("/agregar/{productoId}/{carritoId}")
    public void agregarAlCarrito(@PathVariable Long productoId, @PathVariable Long carritoId) {
        Producto producto = productoService.obtenerProductoPorId(productoId).orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        Carrito carrito = carritoService.buscarCarritoPorId(carritoId).orElseThrow(() -> new RuntimeException("Carrito no encontrado"));
        carritoService.agregarProductoAlCarrito(carrito, producto);
    }




    @GetMapping("/ver/{carritoId}")
    public Map<String, Object> verCarrito(@PathVariable Long carritoId) {
        Carrito carrito = carritoService.buscarCarritoPorId(carritoId).orElseThrow(() -> new RuntimeException("Carrito no encontrado"));
        List<LineaCarritoDto> lineasCarritoDto = carrito.getLineasCarrito().stream()
                .map(LineaCarritoDto::of)
                .collect(Collectors.toList());

       
        double totalCarrito = carritoService.calcularTotalCarrito(carrito);


        Map<String, Object> resultado = new HashMap<>();
        resultado.put("lineasCarrito", lineasCarritoDto);
        resultado.put("total", totalCarrito);

        return resultado;
    }

    @DeleteMapping("/eliminar/{productoId}/{carritoId}")
    public void eliminarDelCarrito(@PathVariable Long productoId, @PathVariable Long carritoId) {
        Producto producto = productoService.obtenerProductoPorId(productoId).orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        Carrito carrito = carritoService.buscarCarritoPorId(carritoId).orElseThrow(() -> new RuntimeException("Carrito no encontrado"));
        carritoService.eliminarProductoDelCarrito(carrito, producto);
    }










    @DeleteMapping("/vaciar")
    public void vaciarCarrito() {
        carritoService.vaciarCarrito();
    }
}
