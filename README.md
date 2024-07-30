# Gestión Inventario Tienda

## Descripción

Gestión Inventario Tienda es una aplicación desarrollada con JavaScript, React y Spring Boot diseñada para ayudar a las tiendas a gestionar sus inventarios de manera eficiente. La aplicación permite la creación y gestión de carritos de compra, el registro de ventas, ingresos y gastos, así como el control del almacén, productos y stock.

## Funcionalidades

- **Carrito de Compra**: Crear, modificar y eliminar carritos de compra.
- **Registro de Ventas**: Registrar y gestionar ventas realizadas.
- **Gestión de Ingresos y Gastos**: Registrar ingresos y gastos para llevar un control financiero.
- **Gestión de Almacén**: Administrar el inventario del almacén.
- **Gestión de Productos**: Añadir, modificar y eliminar productos.
- **Control de Stock**: Monitorear y actualizar el stock de productos.

## Requisitos

Para ejecutar Gestión Inventario Tienda, necesitas tener instalados los siguientes programas y librerías:

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)
- Java (JDK 8 o superior)
- Spring Boot
- MySQL (u otro sistema de base de datos compatible)

## Instalación

1. Clona el repositorio a tu máquina local:
    ```sh
    git clone https://github.com/tuusuario/gestion-inventario-tienda.git
    ```

2. Navega al directorio del proyecto:
    ```sh
    cd gestion-inventario-tienda
    ```

### Backend (Spring Boot)

3. Configura la base de datos en el archivo `application.properties`:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/tu_base_de_datos
    spring.datasource.username=tu_usuario
    spring.datasource.password=tu_contraseña
    spring.jpa.hibernate.ddl-auto=update
    ```

4. Compila y ejecuta el backend:
    ```sh
    ./mvnw spring-boot:run
    ```

### Frontend (React)

5. Navega al directorio del frontend:
    ```sh
    cd frontend
    ```

6. Instala las dependencias necesarias:
    ```sh
    npm install
    ```

7. Ejecuta la aplicación de React:
    ```sh
    npm start
    ```

## Uso

1. Accede a la aplicación en tu navegador web, generalmente disponible en `http://localhost:3000`.

2. Utiliza las diferentes funcionalidades de la aplicación para gestionar tu inventario, incluyendo la creación de carritos de compra, el registro de ventas, y la gestión de productos y stock.
