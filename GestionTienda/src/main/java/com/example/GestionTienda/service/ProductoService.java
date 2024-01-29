package com.example.GestionTienda.service;

import java.beans.Transient;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.example.GestionTienda.model.Producto;
import com.example.GestionTienda.repository.ProductoRepository;

import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductoService {
    
   @Autowired
    private ProductoRepository productoRepository;
    private CategoriaService categoriaService; 
    private CarritoService carritoService;

	@Transactional(readOnly = true)
	public Producto findById(int id) throws DataAccessException {
		return productoRepository.findById(id);
	}

    @Transactional(readOnly = true)
    public List<Producto> findAll() throws DataAccessException {
        return productoRepository.findAll();
    }

}