package com.example.GestionTienda.controller;
import com.example.GestionTienda.Dto.LineaCarritoDto;

import com.example.GestionTienda.model.Carrito;
import com.example.GestionTienda.model.Producto;
import com.example.GestionTienda.service.CarritoService;
import com.example.GestionTienda.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    private ProductoService productoService;

    @PostMapping("/new")
    public ResponseEntity<Carrito> crearUnoNuevo(){
        Carrito carrito = carritoService.crearUnCarrito();
        return ResponseEntity.ok(carrito);
    }

    @PostMapping("/agregar/{productoId}/{carritoId}")
    public void agregarAlCarrito(@PathVariable Long productoId,@PathVariable Long carritoId) {
        Optional<Producto> producto = productoService.obtenerProductoPorId(productoId);
        carritoService.agregarProductoAlCarrito(producto);
    }

    @GetMapping("/ver/{carritoId}")
    public Map<String, Object> verCarrito(@PathVariable Long carritoId) {
        List<LineaCarritoDto> lineasCarritoDto = carritoService.obtenerProductosEnCarrito()
                .stream()
                .map(lineaCarrito -> {
                    LineaCarritoDto dto = new LineaCarritoDto();
                    dto.setProducto(lineaCarrito.getProducto());
                    dto.setCantidad(lineaCarrito.getCantidad());
                    dto.setPrecio(lineaCarrito.getProducto().getPrecio());
                    return dto;
                })
                .collect(Collectors.toList());

        // Calcular el total del carrito
        double totalCarrito = carritoService.calcularTotalCarrito();

        // Crear un mapa para devolver tanto las líneas del carrito como el total
        Map<String, Object> resultado = new HashMap<>();
        resultado.put("lineasCarrito", lineasCarritoDto);
        resultado.put("total", totalCarrito);

        return resultado;
    }







    @DeleteMapping("/vaciar")
    public void vaciarCarrito() {
        carritoService.vaciarCarrito();
    }
}
