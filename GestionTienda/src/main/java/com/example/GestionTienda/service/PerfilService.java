package com.example.GestionTienda.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.GestionTienda.Dto.CarritoDTO;
import com.example.GestionTienda.Dto.LineaCarritoAlvaroDTO;
import com.example.GestionTienda.Dto.LineaCarritoDto;
import com.example.GestionTienda.Dto.PerfilDto;
import com.example.GestionTienda.Dto.ProductoDTO;
import com.example.GestionTienda.model.Carrito;
import com.example.GestionTienda.model.LineaCarrito;
import com.example.GestionTienda.model.Perfil;
import com.example.GestionTienda.repository.PerfilRepository;
import java.util.*;
@Service
public class PerfilService {
    
    @Autowired
    private PerfilRepository perfilRepository;
    @Autowired
    private CarritoService carritoService;


    @Transactional(readOnly = true)
    public Perfil findJuanPerfil(){
        List<Carrito> carritos = carritoService.findAllTodosLosCarritos();
        Perfil juan = perfilRepository.findJuan();
        juan.setCarrito(carritos);
        perfilRepository.save(juan);
        return juan;
    }

@Transactional(readOnly = true)
public PerfilDto findJuan() {
    double ingresos = 0;
    Perfil juan = findJuanPerfil();
    PerfilDto juanDto = new PerfilDto();
    juanDto.setNombre(juan.getNombre());

    List<CarritoDTO> carritosDto = new ArrayList<>();
    for (Carrito carrito : juan.getCarrito()) {
        CarritoDTO carritoDto = new CarritoDTO();
        carritoDto.setFechaCreacion(carrito.getFechaCreacion().toLocalDate());
        carritoDto.setTotal(carrito.getTotal());
        carritoDto.setCantidadProductos(carrito.getCantidad());
        ingresos += carrito.getTotal();
        List<LineaCarritoAlvaroDTO> lineasCarritoDto = new ArrayList<>();
        for (LineaCarrito lineaCarrito : carrito.getLineasCarrito()) {
            LineaCarritoAlvaroDTO lineaCarritoDto = new LineaCarritoAlvaroDTO();
            lineaCarritoDto.setProducto(new ProductoDTO(lineaCarrito.getProducto().getNombre()));
            lineaCarritoDto.setCantidad(lineaCarrito.getCantidad());
            lineasCarritoDto.add(lineaCarritoDto);
        }
        carritoDto.setLineasCarrito(lineasCarritoDto);
        carritosDto.add(carritoDto);
    }
    juanDto.setCarritos(carritosDto);
    juanDto.setIngresos(ingresos);

    return juanDto;
}



    public Perfil crearPerfil(Perfil perfil){
        List<Carrito> carritos = carritoService.findAllTodosLosCarritos();
        Perfil juan= Perfil.builder()
                .nombre("juan")
                .carrito(carritos)
                .build();
        return perfilRepository.save(juan);
    }





}
