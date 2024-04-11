package com.example.GestionTienda.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.GestionTienda.model.Categoria;
import com.example.GestionTienda.model.Producto;
import com.example.GestionTienda.repository.CategoriaRepository;
import com.example.GestionTienda.repository.ProductoRepository;


@Service
public class CategoriaService {
    @Autowired
    private CategoriaRepository categoriaRepository;
    @Autowired
    private ProductoService productoService;
    @Autowired
    private ProductoRepository productoRepo;

    @Transactional(readOnly = true)
    public List<Categoria> listaDeCategorias() {
        return categoriaRepository.listaDeCategorias();
    }

    @Transactional(readOnly = true)
    public Categoria buscarPorNombre(String nombre) {
        return categoriaRepository.findByName(nombre);
    }


    public Categoria nuevaCategoria(Categoria c){
        Categoria categoria = Categoria.builder()
             .nombre(c.getNombre())
             .build();
             return categoriaRepository.save(categoria);
       }


    public Categoria editarCategoria(Categoria c,String nombre){
        Categoria categoriaExistente= categoriaRepository.findByName(nombre);
        if(categoriaExistente == null){
            throw new RuntimeException("La categoria no existe");
        }else{
            categoriaExistente.setNombre(c.getNombre());
            return categoriaRepository.save(categoriaExistente);
        }             
       }
       public void eliminaCategoria(String nombre) {
        Categoria categoriaExistente = categoriaRepository.findByName(nombre);
        Categoria sinDefinir = categoriaRepository.findByName("Sin Definir");
        
        if (categoriaExistente == null) {
            throw new RuntimeException("La categoría no existe");
        } else {
            List<Producto> productos = productoService.findByCategoriaId(categoriaExistente.getId());
            if (!productos.isEmpty()) {
                for (Producto p : productos) {
                    p.setCategoria(sinDefinir);
                    productoRepo.save(p); 
                }
            }
            categoriaRepository.eliminarCategoriaPorNombre(nombre);
        }
    }

}
