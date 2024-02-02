export function EditarProducto(){




    return(
        <div>
            <h1>Editar Producto</h1>
            <form>
                <label>Nombre</label>
                <input type="text" name="nombre" />
                <label>Precio</label>
                <input type="text" name="precio" />
                <label>Descripción</label>
                <input type="text" name="descripcion" />
                <label>Imagen</label>
                <input type="text" name="imagen" />
                <button type="submit">Editar Producto</button>
            </form>
        </div>
    )
}