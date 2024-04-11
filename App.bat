@echo off
cd "C:\Users\alvar\Desktop\Gestion-Inventario-Tienda\GestionTienda"
start cmd /c "start /MIN cmd /c mvnw spring-boot:run && exit"
timeout /t 3 /nobreak >nul
cd "C:\Users\alvar\Desktop\Gestion-Inventario-Tienda\GestionTienda\frontend"
start cmd /c "start /MIN cmd /c npm start && exit"