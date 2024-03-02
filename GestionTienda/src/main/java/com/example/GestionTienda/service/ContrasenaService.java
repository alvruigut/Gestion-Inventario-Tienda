package com.example.GestionTienda.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.GestionTienda.model.Contrasena;
import com.example.GestionTienda.repository.ContrasenaRepository;


@Service
public class ContrasenaService {
    @Autowired
    private ContrasenaRepository contrasenaRepository;


    public Contrasena crearContrasena(Integer pin){
        Contrasena Contrasena = new Contrasena();
        Contrasena.setPin(pin);
        contrasenaRepository.save(Contrasena);
        return Contrasena;
       }

    public Contrasena ediContrasena(Integer pin, Contrasena nuevopin){
        Optional<Contrasena> contrasena = contrasenaRepository.findByPin(pin);
        if (contrasena.isEmpty()) {
            throw new RuntimeException("No se encontro la contraseña");
        }else{
            Contrasena contrasena2 = contrasena.get();
            contrasena2.setPin(nuevopin.getPin());
            return contrasenaRepository.save(contrasena2);
        }
       
    }

    @Transactional(readOnly = true)
    public List<Contrasena> findAll(){
        return contrasenaRepository.findAll();
    }

}