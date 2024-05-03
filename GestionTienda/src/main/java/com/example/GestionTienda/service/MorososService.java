package com.example.GestionTienda.service;

import org.apache.batik.css.engine.value.svg.OpacityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.GestionTienda.model.Morosos;
import com.example.GestionTienda.repository.MorososRepository;
import java.util.List;
import java.util.Optional;

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

        .build();
        return morososRepository.save(moroso);
    }


    public Morosos editarMorosos(Morosos m, String nombre) throws DataAccessException{
        Morosos moroso = morososRepository.findByName(nombre);
        moroso.setNombre(m.getNombre());
        moroso.setMovil(m.getMovil());
        moroso.setPrecio(m.getPrecio());

        return morososRepository.save(moroso);
    }
        


    public void eliminarMoroso(String nombre){
        Optional<Morosos> morosos = morososRepository.findByNombre(nombre.trim());
        if (morosos.isPresent()){
            morososRepository.delete(morosos.get());
        }else {
            throw new RuntimeException("no se encuentra al moroso");
        }

    }


}
