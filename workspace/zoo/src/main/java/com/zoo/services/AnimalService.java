package com.zoo.services;

import java.lang.reflect.Array;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.zoo.data.AnimalRepository;
import com.zoo.domain.Animal;

@Service
public class AnimalService {
	
	private AnimalRepository animalRepo;
	
	public AnimalService(AnimalRepository animalRepo) {
		this.animalRepo = animalRepo;
	}
	
	public Iterable<Animal> findActiveAnimals() {
		return animalRepo.findByActive(true);
	}	

	// имя животного в базе данных должно быть уникально
	private Animal findByName(String name) throws IllegalArgumentException {
		if (name == null || name.isEmpty()) {
			throw new IllegalArgumentException("Wrong animal name");
		}		
		Optional<Animal> optAnimal = animalRepo.findByName(name);
		if (optAnimal.isPresent()) {
			return optAnimal.get();
		}
		return null;
	}

	public ResponseEntity<Animal> addAnimal(Animal newAnimal) 
			throws IllegalArgumentException {
		if (newAnimal == null) {
			throw new IllegalArgumentException("Add animal to save");
		}		
		Animal animalFromDb = findByName(newAnimal.getName());
		if (animalFromDb != null) {
			updateAnimalBeforeSaving(animalFromDb, newAnimal);
		}
		return new ResponseEntity<>(animalRepo.save(newAnimal), HttpStatus.OK);
	}

	// метод для того, чтобы не добавлялось новое животное 
	// с тем же именем, что уже есть в базе, а корректировались
	// значения уже существующего
	private void updateAnimalBeforeSaving(Animal src, Animal dest) {
		dest.setId(src.getId());
		dest.setActive(true);
	}

	public Iterable<Animal> makeInactive(Long id) {
		Optional<Animal> opt = animalRepo.findById(id);
		if (opt.isPresent()) {
			Animal animal = opt.get();
			animal.setActive(false);
			animalRepo.save(animal);
		}
		return findActiveAnimals();
	}

	public Animal findById(Long id) {
		if (id == null) {
			return null;
		}
		Optional<Animal> dbAnimal = animalRepo.findById(id);
		if (dbAnimal.isPresent()) {
			return dbAnimal.get();
		}
		return null;
	}
	
	
}
