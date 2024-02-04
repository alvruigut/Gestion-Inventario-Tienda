package com.example.GestionTienda.service;

import java.beans.Transient;
import java.util.List;
import java.util.Optional;

import com.example.GestionTienda.Dto.GetProductoDto;
import com.example.GestionTienda.Dto.PostProductoDto;
import com.example.GestionTienda.Dto.PutProductoDto;

import com.example.GestionTienda.model.Carrito;
import com.example.GestionTienda.repository.CarritoRepository;
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



	@Transactional(readOnly = true)
	public Producto findById(int id) throws DataAccessException {
		return productoRepository.findById(id);
	}

    @Transactional(readOnly = true)
    public List<Producto> findAll() throws DataAccessException {
        return productoRepository.findAll();
    }

    //listar todos los productos que esten disponibles
    public List<GetProductoDto> findallDisponibles(){
       List<GetProductoDto> getProductoDtos = productoRepository.listaDeProductosDisponibles();
        if (getProductoDtos.isEmpty()){
         throw new RuntimeException("No hay productos disponibles");
        }else{
         return  getProductoDtos;
        }
    }

    //crear un nuevo producto
    public PostProductoDto crearNuevoProducto(PostProductoDto postProductoDto){
     Producto producto = Producto.builder()
             .nombre(postProductoDto.nombre())
             .descripcion(postProductoDto.descripcion())
             .precio(postProductoDto.precio())
             .disponible(true)
             .categoria(postProductoDto.categoria())
             .imagen(postProductoDto.imagen())
             .build();
     producto = productoRepository.save(producto);
     return PostProductoDto.of(producto);
    }

    @Transactional(readOnly = true)
    public Producto findByName(String nombre) throws DataAccessException {
        return productoRepository.findByName(nombre);
    }
    
   //editar un producto
    public Producto editarProducto(String nombreProducto,PutProductoDto producto) throws DataAccessException{
        Producto productoExistente = productoRepository.findByName(nombreProducto);
        if (productoExistente == null){
            throw new RuntimeException("No existe el producto");
     }else{
            productoExistente.setNombre(producto.getNombre());
            productoExistente.setDescripcion(producto.getDescripcion());
            productoExistente.setPrecio(producto.getPrecio());
            productoExistente.setDisponible(producto.isDisponible());
            productoExistente.setCategoria(producto.getCategoria());
        }

        return productoRepository.save(productoExistente);
    }



    public Optional<Producto> obtenerProductoPorId(Long productoId) {
        Optional<Producto> productoOptional = productoRepository.findById(productoId);

        if (productoOptional.isPresent()){
            return productoOptional;
        }else {
            throw new RuntimeException("error");
        }

    }

    public void eliminarProductoPorNombre(String nombre) {
        productoRepository.eliminarProductoPorNombre(nombre);
    }

}
