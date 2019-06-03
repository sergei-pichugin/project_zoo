package com.zoo.web.api;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.zoo.data.AnimalRepository;
import com.zoo.domain.Animal;
import com.zoo.services.AnimalService;

@RestController
@RequestMapping(path="/animals", produces="application/json")
@CrossOrigin(origins = "*")
public class AnimalController {
	
	private AnimalService animalService;
	
	public AnimalController(AnimalService animalService) {
		this.animalService = animalService;
	}
	
	@GetMapping
	public Iterable<Animal> findActiveAnimals() {
		return animalService.findActiveAnimals();
	}
	
	@PostMapping(consumes="application/json")
	public ResponseEntity<Animal> addAnimal(@RequestBody Animal animal) {
		try {
			return animalService.addAnimal(animal);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}
	
	// вместо удаления из базы у животного просто меняется статус 
	// активности на false, чтобы оно было доступно для истории
	// и на frontend возвращается обновлённый список активных животных
	@GetMapping("/{id}")
	public Iterable<Animal> makeInactive(@PathVariable("id") Long id) {
		return animalService.makeInactive(id);
	}
}
