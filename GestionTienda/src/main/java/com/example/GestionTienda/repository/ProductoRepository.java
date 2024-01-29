package com.example.GestionTienda.repository;

import com.example.GestionTienda.Dto.GetProductoDto;
import com.example.GestionTienda.Dto.PostProductoDto;
import com.example.GestionTienda.model.Producto;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductoRepository extends JpaRepository<Producto,Long> {
    public Producto findById(int id);
    public List<Producto> findAll();

    @Query("""
    select new com.example.GestionTienda.Dto.GetProductoDto(
    p.imagen,
    p.nombre,
    p.precio
    ) from Producto p
    where p.disponible = true
    """)
    public List<GetProductoDto> listaDeProductosDisponibles();

    Optional<PostProductoDto> findByNombreIgnoreCase(String nombre);


}
