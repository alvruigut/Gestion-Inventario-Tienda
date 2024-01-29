insert into Categoria(id,nombre) values (1,'refresco')
insert into Categoria(id,nombre) values (2,'chuches')
insert into Categoria(id,nombre) values (3,'snacks')
insert into Categoria(id,nombre) values (4,'limpieza')
insert into Categoria(id,nombre) values (5,'bebida alcoholica')
insert into Categoria(id,nombre) values (6,'fruta')
insert into Categoria(id,nombre) values (7,'verdura')

insert into Producto (id,nombre,precio,descripcion,imagen,disponible,categoria_id) values (1,'coca',5.0,'bien fresquita',null,true,1)
insert into Producto (id,nombre,precio,descripcion,imagen,disponible,categoria_id) values (2,'fanta',5.0,'bien fresquita',null,true,1)
insert into Producto (id,nombre,precio,descripcion,imagen,disponible,categoria_id) values (3,'chicles',1.0,'pa masticar',null,true,2)
insert into Producto (id,nombre,precio,descripcion,imagen,disponible,categoria_id) values (4,'patatas',1.0,'pa masticar',null,true,3)
insert into Producto (id,nombre,precio,descripcion,imagen,disponible,categoria_id) values (5,'label',5.0,'bien fresquita',null,true,5)
insert into Producto (id,nombre,precio,descripcion,imagen,disponible,categoria_id) values (6,'manzana',1.0,'pa masticar',null,true,6)
insert into Producto (id,nombre,precio,descripcion,imagen,disponible,categoria_id) values (7,'tomate',1.0,'pa masticar',null,true,7)
insert into Producto (id,nombre,precio,descripcion,imagen,disponible,categoria_id) values (8,'fregona',5.0,'pa limpia',null,true,4)
insert into Producto (id,nombre,precio,descripcion,imagen,disponible,categoria_id) values (9,'escoba',5.0,'pa limpia',null,true,4)

insert into Carrito(id, cantidad, producto_id) values (1, 2, 1)
insert into Carrito(id, cantidad, producto_id) values (2, 4, 2)
insert into Carrito(id, cantidad, producto_id) values (3, 7, 3)

