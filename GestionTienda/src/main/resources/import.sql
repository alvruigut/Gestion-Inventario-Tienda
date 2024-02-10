insert into perfil (id, nombre) values (1, 'Juan');


insert into Categoria(id,nombre) values (10,'Refresco')
insert into Categoria(id,nombre) values (20,'Chuches')
insert into Categoria(id,nombre) values (30,'Snacks')
insert into Categoria(id,nombre) values (40,'Limpieza')
insert into Categoria(id,nombre) values (50,'Bebida alcoholica')
insert into Categoria(id,nombre) values (60,'Fruta')
insert into Categoria(id,nombre) values (70,'Verdura')
insert into Categoria(id,nombre) values (80,'Sin Definir')

insert into Producto (id,nombre,precio,descripcion,imagen,disponible,cantidad_disponible,categoria_id) values (100,'coca',5.5,'bien fresquita','logo192.png',true,12,10)
insert into Producto (id,nombre,precio,descripcion,imagen,disponible,cantidad_disponible,categoria_id) values (200,'fanta',5.0,'bien fresquita',null,true,12,10)
insert into Producto (id,nombre,precio,descripcion,imagen,disponible,cantidad_disponible,categoria_id) values (300,'chicles',1.0,'pa masticar',null,true, 12,20)
insert into Producto (id,nombre,precio,descripcion,imagen,disponible,cantidad_disponible,categoria_id) values (400,'patatas',1.0,'pa masticar',null,true, 12,30)
insert into Producto (id,nombre,precio,descripcion,imagen,disponible,cantidad_disponible,categoria_id) values (500,'label',5.0,'bien fresquita',null,true,12,50)
insert into Producto (id,nombre,precio,descripcion,imagen,disponible,cantidad_disponible,categoria_id) values (600,'manzana',1.0,'pa masticar',null,true, 12,60)
insert into Producto (id,nombre,precio,descripcion,imagen,disponible,cantidad_disponible,categoria_id) values (700,'tomate',1.0,'pa masticar',null,true,  12,70)
insert into Producto (id,nombre,precio,descripcion,imagen,disponible,cantidad_disponible,categoria_id) values (800,'fregona',5.0,'pa limpia',null,true,   12,40)
insert into Producto (id,nombre,precio,descripcion,imagen,disponible,cantidad_disponible,categoria_id) values (900,'escoba',5.0,'pa limpia',null,true,    12,40)
insert into Producto (id,nombre,precio,descripcion,imagen,disponible,cantidad_disponible,categoria_id) values (1000,'cubata',5.0,'pa beber',null,true,   12,50)
insert into Producto (id,nombre,precio,descripcion,imagen,disponible,cantidad_disponible,categoria_id) values (1100,'cerve',5.0,'pa beber',null,true,    12,50)
--fecha es LocalDateTime
insert into carrito(id,cantidad, fecha_creacion, total) values (100,2, '2024-02-08T00:00:00', 10.0)
insert into linea_carrito(cantidad,carrito_id,id, producto_id ) values (1,100,1,100)
insert into  carrito_lineas_carrito(carrito_id, lineas_carrito_id) values (100,1)