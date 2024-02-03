package com.example.GestionTienda.service;

import com.example.GestionTienda.Dto.LineaCarritoDto;
import com.example.GestionTienda.model.Carrito;
import com.example.GestionTienda.model.LineaCarrito;
import com.example.GestionTienda.model.Producto;
import com.example.GestionTienda.repository.CarritoRepository;
import com.example.GestionTienda.util.BaseEntity;
import jakarta.persistence.ManyToOne;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.GestionTienda.model.Carrito;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CarritoService {

    private final Map<Long, LineaCarrito> carrito = new HashMap<>();
    private final CarritoRepository carritoRepository;


    public List<Carrito> findAllTodosLosCarritos(){

            return     carritoRepository.findAll();


    }



    public Carrito crearUnCarrito(){
        Carrito carrito1 = Carrito.builder()
                .cantidad(null)
                .precio(0.0)
                .producto(null)
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
        LineaCarrito nuevaLinea = new LineaCarrito();
        nuevaLinea.setProducto(producto);
        nuevaLinea.setCantidad(1);
        nuevaLinea.setCarrito(carrito);
        carrito.getLineasCarrito().add(nuevaLinea);
        carritoRepository.save(carrito);
    }





    public void eliminarProductoDelCarrito(Producto producto) {
        Long productoId = producto.getId();
        carrito.computeIfPresent(productoId, (id, lineaCarrito) -> {
            lineaCarrito.disminuirCantidad();
            return lineaCarrito.getCantidad() > 0 ? lineaCarrito : null;
        });
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


    public void vaciarCarrito() {
        carrito.clear();
    }



}
