package com.example.GestionTienda.service;

import java.beans.Transient;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.example.GestionTienda.Dto.GetProductoDto;
import com.example.GestionTienda.Dto.PostProductoDto;
import com.example.GestionTienda.Dto.PutProductoDto;

import com.example.GestionTienda.model.Carrito;
import com.example.GestionTienda.model.Categoria;
import com.example.GestionTienda.repository.CarritoRepository;
import com.example.GestionTienda.repository.CategoriaRepository;

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
    
    @Autowired
    private CategoriaRepository categoriaRepository;


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
    Categoria categoria = categoriaRepository.findByName(postProductoDto.categoria().getNombre());
    Producto producto = Producto.builder()
             .nombre(postProductoDto.nombre())
             .descripcion(postProductoDto.descripcion())
             .precio(postProductoDto.precio())
            .pvp(postProductoDto.pvp())
             .disponible(true)
             .categoria(categoria)
             .cantidadDisponible(postProductoDto.cantidadDisponible())
             .imagen(postProductoDto.imagen())
             .build();
     producto = productoRepository.save(producto);
     return PostProductoDto.of(producto);
    }

    @Transactional(readOnly = true)
    public Producto findByName(String nombre) throws DataAccessException {
        return productoRepository.findByName(nombre);
    }
    
    @Transactional(readOnly = true)
    public List<Producto> findByCategoriaId(Long id) throws DataAccessException {
        return productoRepository.findByCategoriaId(id);
    }

   //editar un producto
    public Producto editarProducto(String nombreProducto,PutProductoDto producto) throws DataAccessException{
        Categoria categoria = categoriaRepository.findByName(producto.getCategoria().getNombre());

        Producto productoExistente = productoRepository.findByName(nombreProducto);
        if (productoExistente == null){
            throw new RuntimeException("No existe el producto");
     }else{
            productoExistente.setNombre(producto.getNombre());
            productoExistente.setDescripcion(producto.getDescripcion());
            productoExistente.setPrecio(producto.getPrecio());
            productoExistente.setCantidadDisponible(producto.getCantidadDisponible());
            productoExistente.setImagen(producto.getImagen());
            if (producto.getCantidadDisponible()>0){
                productoExistente.setDisponible(true);
            }else{
                productoExistente.setDisponible(false);
            }
            productoExistente.setCategoria(categoria);
        }

        return productoRepository.save(productoExistente);
    }


    @Transactional(readOnly = true)
    public List<Producto> findByCategoryName(String nombre) throws DataAccessException {
        return productoRepository.findByCategoryName(nombre);
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

    public Map<String,Integer> listaDeCategorias() {
        Map<String,Integer> res= new HashMap<>() ;
        List<Categoria> categorias= categoriaRepository.listaDeCategorias();
        for (Categoria categoria : categorias) {
            Integer cantidad= productoRepository.cantidadProductosPorCategoria(categoria.getId());
            String nombre= categoria.getNombre();
            res.put(nombre, cantidad);
        }
      
        return res;
    
    }
}
