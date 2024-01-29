package com.example.GestionTienda;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GestionTiendaApplication {

	public static void main(String[] args) {
		SpringApplication.run(GestionTiendaApplication.class, args);
		System.out.println("\nhttp://localhost:9000/h2-console/login.jsp");
	}
	
}
