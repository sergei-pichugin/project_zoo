package com.zoo.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

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
