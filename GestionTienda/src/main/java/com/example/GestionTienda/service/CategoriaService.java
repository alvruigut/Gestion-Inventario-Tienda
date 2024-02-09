package com.example.GestionTienda.service;

import com.example.GestionTienda.model.Producto;
import com.example.GestionTienda.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class CategoriaService {
    @Autowired
    private ProductoRepository productoRepository;

    public List<Producto> buscarPorNombreCategoria(String nombreCategoria) {
        return productoRepository.findByCategoriaNombre(nombreCategoria);
    }
}
