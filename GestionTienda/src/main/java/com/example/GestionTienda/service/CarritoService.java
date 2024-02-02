package com.example.GestionTienda.service;

import com.example.GestionTienda.model.Carrito;
import com.example.GestionTienda.model.Producto;
import com.example.GestionTienda.repository.CarritoRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.GestionTienda.model.Carrito;

import java.util.*;

@Service
@RequiredArgsConstructor
public class CarritoService {

    private final Map<Long, LineaCarrito> carrito = new HashMap<>();
    private final CarritoRepository carritoRepository;
    public Carrito crearUnCarrito(){
        Carrito carrito1 = Carrito.builder()
                .cantidad(null)
                .precio(0.0)
                .producto(null)
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

    public void agregarProductoAlCarrito(Optional<Producto> producto) {
        Long productoId = producto.get().getId();
        carrito.compute(productoId, (id, lineaCarrito) -> {
            if (lineaCarrito == null) {
                return new LineaCarrito(producto, 1);
            } else {
                lineaCarrito.aumentarCantidad();
                return lineaCarrito;
            }
        });
    }

    public void eliminarProductoDelCarrito(Producto producto) {
        Long productoId = producto.getId();
        carrito.computeIfPresent(productoId, (id, lineaCarrito) -> {
            lineaCarrito.disminuirCantidad();
            return lineaCarrito.getCantidad() > 0 ? lineaCarrito : null;
        });
    }

    public List<LineaCarrito> obtenerProductosEnCarrito() {
        return new ArrayList<>(carrito.values());
    }

    public double calcularTotalCarrito() {
        return carrito.values().stream()
                .mapToDouble(LineaCarrito::getTotal)
                .sum();
    }

    public void vaciarCarrito() {
        carrito.clear();
    }

    public static class LineaCarrito {
        private final Producto producto;
        private int cantidad;

        public LineaCarrito(Optional<Producto> producto, int cantidad) {
            this.producto = producto.get();
            this.cantidad = cantidad;
        }

        public Producto getProducto() {
            return producto;
        }

        public int getCantidad() {
            return cantidad;
        }

        public void aumentarCantidad() {
            cantidad++;
        }

        public void disminuirCantidad() {
            cantidad--;
        }



        public double getTotal() {
            return producto.getPrecio() * cantidad;
        }
    }
}
