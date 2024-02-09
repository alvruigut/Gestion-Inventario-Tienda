package com.example.GestionTienda.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.GestionTienda.model.Morosos;
import com.example.GestionTienda.repository.MorososRepository;
import java.util.List;

@Service
public class MorososService {
    
    @Autowired
    private MorososRepository morososRepository;


    @Transactional(readOnly = true)
    public List<Morosos> findAll() throws DataAccessException{
        return morososRepository.findAll2();
    }

    public Morosos crearMoroso(Morosos m){
        Morosos moroso = Morosos.builder()
        .nombre(m.getNombre().trim())
        .movil(m.getMovil())
        .precio(m.getPrecio())
        .productos(m.getProductos())
        .build();
        return morososRepository.save(moroso);
    }


    public Morosos editarMorosos(Morosos m, String nombre) throws DataAccessException{
        Morosos moroso = morososRepository.findByName(nombre);
        moroso.setNombre(m.getNombre());
        moroso.setMovil(m.getMovil());
        moroso.setPrecio(m.getPrecio());
        moroso.setProductos(m.getProductos());
        return morososRepository.save(moroso);
    }


    public void eliminarMoroso(String nombre){
        morososRepository.eliminarPorNombre(nombre);
    }


}
