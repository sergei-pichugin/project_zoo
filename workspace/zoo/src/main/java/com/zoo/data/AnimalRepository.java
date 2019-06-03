package com.zoo.data;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.zoo.domain.Animal;

@CrossOrigin(origins = "*")
public interface AnimalRepository extends CrudRepository<Animal, Long> {

	Iterable<Animal> findByActive(boolean active);

	Optional<Animal> findByName(String name);

}
