package com.example.GestionTienda.model;


import com.example.GestionTienda.util.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "producto", uniqueConstraints = @UniqueConstraint(columnNames = "nombre"))
public class Producto  extends BaseEntity{

    @Column(name = "nombre")
    @NonNull
    private String nombre;
    @Column(name = "precio")
    @NonNull
    private Double precio;
    @Column(name = "descripcion")
    private String descripcion;
    @Column(name = "imagen")
    private String imagen;
    @Column(name = "disponible")
    private boolean disponible;
    @Column(name = "cantidadDisponible")
    private Integer cantidadDisponible;
    @ManyToOne
    @NonNull
    @JoinColumn(name = "categoria_id",referencedColumnName = "id")
    private Categoria categoria;
    
}
