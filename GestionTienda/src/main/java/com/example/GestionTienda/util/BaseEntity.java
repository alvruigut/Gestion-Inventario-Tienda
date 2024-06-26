package com.example.GestionTienda.util;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.SequenceGenerator;

@MappedSuperclass
public class BaseEntity {

    @Id
	@SequenceGenerator(name = "entity_seq", 
        sequenceName = "entity_sequence", 
        initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE	, generator = "entity_seq")
	protected Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

    
}
