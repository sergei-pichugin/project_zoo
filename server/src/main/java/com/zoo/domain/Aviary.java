package com.zoo.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import lombok.Data;

@Entity
@Data
public class Aviary {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@ManyToOne
	@JoinColumn(name="first_animal")
	private Animal firstAnimal;
	
	@ManyToOne
	@JoinColumn(name="second_animal")
	private Animal secondAnimal;
	
	@ManyToOne
	@JoinColumn(name="plan_id")
	private Plan plan;
}
