import React, { useState } from "react";
export function EditarContrasena() {
    const [contrasena, setContrasena] = useState("");
    const [nuevaContrasena, setNuevaContrasena] = useState("");
    const [confirmarContrasena, setConfirmarContrasena] = useState("");
    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [cargando, setCargando] = useState(false);
    const [mostrar, setMostrar] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (nuevaContrasena !== confirmarContrasena) {
            setError(true);
            setMensaje("Las contraseñas no coinciden");
            return;
        }
        setError(false);
        setCargando(true);
        try {
            const response = await fetch(`http://localhost:9000/api/contrasena/editar/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contrasena,
                    nuevaContrasena,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            console.log(data);
            setMensaje(data.message);
        } catch (error) {
            setError(true);
            setMensaje(error.message);
        } finally {
            setCargando(false);
        }
    }

    return (
        <div className="container">
            <h1>Editar contraseña</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="contrasena" className="form-label">
                        Contraseña actual
                    </label>
                    <input
                        type={mostrar ? "text" : "password"}
                        className="form-control"
                        id="contrasena"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="nuevaContrasena" className="form-label">
                        Nueva contraseña
                    </label>
                    <input
                        type={mostrar ? "text" : "password"}
                        className="form-control"
                        id="nuevaContrasena"
                        value={nuevaContrasena}
                        onChange={(e) => setNuevaContrasena(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmarContrasena" className="form-label">
                        Confirmar nueva contraseña
                    </label>
                    <input
                        type={mostrar ? "text" : "password"}
                        className="form-control"
                        id="confirmarContrasena"
                        value={confirmarContrasena}
                        onChange={(e) => setConfirmarContrasena(e.target.value)}
                    />
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="mostrar"
                        value={mostrar}
                        onChange={(e) => setMostrar(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="mostrar">
                        Mostrar contraseña
                    </label>
                </div>
                <button type="submit" className="btn btn-primary" disabled={cargando}>
                    {cargando ? "Cargando..." : "Guardar"}
                </button>
                {error && <div className="alert alert-danger mt-3">{mensaje}</div>}
                {!error && mensaje && <div className="alert alert-success mt-3">{mensaje}</div>}
            </form>
        </div>
    );

    }