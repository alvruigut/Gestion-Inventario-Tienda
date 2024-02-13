package com.example.GestionTienda.controller;
import com.example.GestionTienda.Dto.LineaCarritoDto;

import com.example.GestionTienda.model.Carrito;
import com.example.GestionTienda.model.Producto;
import com.example.GestionTienda.service.CarritoService;
import com.example.GestionTienda.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/carrito")
public class CarritoController {

    @Autowired
    private CarritoService carritoService;

    @Autowired
    private ProductoService productoService;

    @GetMapping("/all/carritos")
    public ResponseEntity<List<Map<String, Object>>> findAll() {
        List<Carrito> carritos = carritoService.findAllTodosLosCarritos();
        List<Map<String, Object>> response = carritos.stream().map(carrito -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", carrito.getId());
            map.put("Fecha Creacion", carrito.getFechaCreacion());
            map.put("Cantidad de productos", carrito.getCantidad());
            map.put("total", carrito.calcularTotal());
            return map;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/allhoy")
    public ResponseEntity<List<Map<String, Object>>> findAllHoy() {
        List<Carrito> carritos = carritoService.findAllTodosLosCarritos();
        List<Map<String, Object>> response = carritos.stream()
                .filter(fecha -> fecha.getFechaCreacion().toLocalDate().equals(LocalDate.now()))
                .sorted(Comparator.comparing(Carrito::getFechaCreacion).reversed())
                .map(carrito -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", carrito.getId());
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
                    String fechaFormateada = carrito.getFechaCreacion().format(formatter);
                    map.put("Fecha Creacion", fechaFormateada);
                    map.put("Cantidad de productos", carrito.getCantidad());
                    map.put("total", carrito.calcularTotal());
                    return map;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }


    @PostMapping("/new")
    public ResponseEntity<Carrito> crearUnoNuevo() {
        Carrito carrito = carritoService.crearUnCarrito();
        return ResponseEntity.ok(carrito);
    }

    @PostMapping("/agregar/{barcodeFilePath}/{carritoId}")
    public void agregarAlCarrito(@PathVariable String barcodeFilePath, @PathVariable Long carritoId) {
        Carrito carrito = carritoService.buscarCarritoPorId(carritoId).orElseThrow(() -> new RuntimeException("Carrito no encontrado"));
        carritoService.agregarProductoAlCarrito(carrito, barcodeFilePath);
    }
    @PostMapping("/agrega/{carritoId}")
    public void agregarAlCarrito1(@PathVariable Long carritoId, @RequestParam("barcodeImage") MultipartFile barcodeImage) throws IOException {
        Carrito carrito = carritoService.buscarCarritoPorId(carritoId).orElseThrow(() -> new RuntimeException("Carrito no encontrado"));

        File tempFile = File.createTempFile("barcode", ".png");
        try (OutputStream os = new FileOutputStream(tempFile)) {
            os.write(barcodeImage.getBytes());
        }

        carritoService.agregarProductoAlCarrito(carrito, tempFile.getAbsolutePath());
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


    @DeleteMapping("/vaciar/{carritoId}")
    public void vaciarCarrito(@PathVariable Long carritoId) {
        carritoService.vaciarCarrito(carritoId);

    }
    @DeleteMapping("/eliminar/{carritoId}")
    public void eliminarCarrito(@PathVariable Long carritoId) {
        try{
            carritoService.eliminarCarritoPorId(carritoId);

        }catch (Exception e){
            System.out.println(e);
        }
    }
}
