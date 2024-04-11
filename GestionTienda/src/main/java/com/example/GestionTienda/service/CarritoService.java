package com.example.GestionTienda.service;

import com.example.GestionTienda.model.Carrito;
import com.example.GestionTienda.model.LineaCarrito;
import com.example.GestionTienda.model.Producto;
import com.example.GestionTienda.repository.CarritoRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class CarritoService {

    private final CarritoRepository carritoRepository;


    public List<Carrito> findAllTodosLosCarritos(){
            return carritoRepository.findAll();
    }



    public Carrito crearUnCarrito(){
        Carrito carrito1 = Carrito.builder()
                .cantidad(0)
                .fechaCreacion(LocalDateTime.now())
                .lineasCarrito(new ArrayList<>())
                .total(0.0)
                .build();
        carritoRepository.save(carrito1);
        return carrito1;
    }

    public Optional<Carrito> buscarCarritoPorId(Long id){
        Optional<Carrito> carrito1 = carritoRepository.findById(id);
        if (carrito1.isPresent()){
            return carrito1;
        }else{
            throw new RuntimeException("no se encuentra el carrito ");
        }
    }

    public void agregarProductoAlCarrito(Carrito carrito, Producto producto) {
        LineaCarrito lineaExistente = carrito.getLineasCarrito().stream()
                .filter(linea -> linea.getProducto().getId().equals(producto.getId()))
                .findFirst()
                .orElse(null);

        if (lineaExistente != null) {

            lineaExistente.aumentarCantidad();
        } else {

            LineaCarrito nuevaLinea = new LineaCarrito(producto, 1);
            nuevaLinea.setCarrito(carrito);
            carrito.getLineasCarrito().add(nuevaLinea);
        }

        carritoRepository.save(carrito);
        actualizarTotalCarrito(carrito);
    }


    public void actualizarTotalCarrito(Carrito carrito) {
        double total = carrito.getLineasCarrito().stream()
                .mapToDouble(LineaCarrito::getTotal)
                .sum();
        Integer cantidad = carrito.getLineasCarrito().stream()
                .mapToInt(LineaCarrito::getCantidad)
                                .sum();

        carrito.setCantidad(cantidad);
        carrito.setTotal(total);
        carritoRepository.save(carrito);
    }



    public void eliminarCarritoPorId(Long id) {
        Optional<Carrito> carritoOptional = carritoRepository.findById(id);
        if (carritoOptional.isPresent()) {
            Carrito carrito = carritoOptional.get();
            carrito.getLineasCarrito().clear();
            carritoRepository.deleteById(id);
        } else {
            throw new RuntimeException("No se encontró el carrito con ID: " + id);
        }
    }




    public void eliminarProductoDelCarrito(Carrito carrito, Producto producto) {
        LineaCarrito lineaCarrito = carrito.getLineasCarrito().stream()
                .filter(linea -> linea.getProducto().getId().equals(producto.getId()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Producto no encontrado en el carrito"));

        lineaCarrito.disminuirCantidad();

        if (lineaCarrito.getCantidad() <= 0) {
            carrito.getLineasCarrito().remove(lineaCarrito);
        }

        carritoRepository.save(carrito);
        actualizarTotalCarrito(carrito);
    }


    public List<LineaCarrito> obtenerProductosEnCarrito(Long id) {
        Carrito carrito = carritoRepository.findById(id).orElseThrow(() -> new RuntimeException("Carrito no encontrado"));
        carrito.setTotal(calcularTotalCarrito(carrito));
        carritoRepository.save(carrito);
        return new ArrayList<>(carrito.getLineasCarrito());
    }


    public double calcularTotalCarrito(Carrito carrito) {
        return carrito.getLineasCarrito().stream()
                .mapToDouble(LineaCarrito::getTotal)
                .sum();
    }


    public void vaciarCarrito(Long id) {
        Carrito carrito = carritoRepository.findById(id).orElseThrow(() -> new RuntimeException("Carrito no encontrado"));
        carrito.setCantidad(0);
        carrito.getLineasCarrito().clear();
        carrito.setTotal(0);
        carritoRepository.save(carrito);
    }
    

    

    public Carrito disminuirCantidadProducto(Long idCarrito, String nombreProducto){
        Carrito carrito = carritoRepository.findById(idCarrito).orElseThrow(() -> new RuntimeException("Carrito no encontrado"));
        List<LineaCarrito> conj= carrito.getLineasCarrito();
        for (LineaCarrito linea : conj){
            if (linea.getProducto().getNombre().equals(nombreProducto)){
                if (linea.getCantidad() > 1){
                    linea.setCantidad(linea.getCantidad()-1);
                }
            }
        }
        return carritoRepository.save(carrito);
    }

    public Carrito aumentarCantidadProducto(Long idCarrito, String nombreProducto){
        Carrito carrito = carritoRepository.findById(idCarrito).orElseThrow(() -> new RuntimeException("Carrito no encontrado"));
        List<LineaCarrito> conj= carrito.getLineasCarrito();
        for (LineaCarrito linea : conj){
            if (linea.getProducto().getNombre().equals(nombreProducto)){
                linea.setCantidad(linea.getCantidad()+1);
            }
        }
        carritoRepository.save(carrito);

        return carritoRepository.save(carrito);
    }

}
