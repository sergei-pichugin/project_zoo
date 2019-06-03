package com.zoo.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.zoo.data.AviaryRepository;
import com.zoo.data.PlanRepository;
import com.zoo.domain.Animal;
import com.zoo.domain.Aviary;
import com.zoo.domain.AviaryReport;
import com.zoo.domain.Plan;

@Service
public class AllocationService {
	
	private AviaryRepository aviaryRepo;
	
	private PlanRepository planRepo;
	
	private AnimalService animalService;
	
	public AllocationService(AviaryRepository aviaryRepo,
								PlanRepository planRepo,
								AnimalService animalService) {
		this.aviaryRepo = aviaryRepo;
		this.planRepo = planRepo;
		this.animalService = animalService;
	}

	// в вольере может быть только максимум 2 животных по ТЗ
	public ResponseEntity<Plan> createPlan(List<List<Long>> idsByAviaries) 
			throws IllegalArgumentException {	
		
		Plan plan = new Plan();
		plan.setDateCreated(LocalDateTime.now());
		planRepo.save(plan);
		for (int i = 0; i < idsByAviaries.size(); i++) {
			Aviary aviary = new Aviary();			
			List<Long> aviaryIds = idsByAviaries.get(i);
			Animal animal1 = aviaryIds.size() > 0 ? 
					animalService.findById(aviaryIds.get(0)) : null;
			Animal animal2 = aviaryIds.size() > 1 ? 
					animalService.findById(aviaryIds.get(1)) : null;
			//сохраняем в вольере по алфавиту названий животных
			if (animal1 != null && animal2 != null) {
				if (animal2.getName().compareToIgnoreCase(animal1.getName()) < 0) {
					aviary.setFirstAnimal(animal2);
					aviary.setSecondAnimal(animal1);
				}
			} else {
				aviary.setFirstAnimal(animal1);
				aviary.setSecondAnimal(animal2);
			}			
			aviary.setPlan(plan);
			aviaryRepo.save(aviary);
		}
		return new ResponseEntity<>(plan, HttpStatus.OK);
	}

	public ResponseEntity<List<Aviary>> generatePlan(int forAviaries) {
		if (forAviaries < 1) return new ResponseEntity<>(null, HttpStatus.OK);
		
		Map<Long, Boolean> doneMap = generateMapAnimalsInAviaries();
		
		List<AviaryReport> pairs = aviaryRepo.groupPairs();
		
		List<Aviary> aviaries = allocateByFrequency(pairs, doneMap, forAviaries);
		
		return new ResponseEntity<>(aviaries, HttpStatus.OK);
	}	

	//метод для формирования map, где каждому активному животному сопоставляется
	//false-признак, что оно пока не в вольере
	private Map<Long, Boolean> generateMapAnimalsInAviaries() {
		Iterable<Animal> activeAnimals = animalService.findActiveAnimals();
		if (activeAnimals == null) return null;
		Map<Long, Boolean> doneMap = new HashMap<>();
		for (Animal animal: activeAnimals) {
			doneMap.put(animal.getId(), false);
		}		
		return doneMap;
	}
	
	private List<Aviary> allocateByFrequency(
			List<AviaryReport> pairs, 
			Map<Long, Boolean> doneMap,
			int forAviaries) {
		List<Aviary> list = new ArrayList<>(forAviaries);
		int i;
		for (i = 0; i < Math.min(forAviaries, pairs.size()); i++) {
			Aviary aviary = new Aviary();
			AviaryReport pair = pairs.get(i);
			Long animalId1 = pair.getFirstAnimal(); doneMap.put(animalId1, true);
			Long animalId2 = pair.getSecondAnimal(); doneMap.put(animalId2, true);
			Animal animal1 = animalService.findById(animalId1);
			Animal animal2 = animalService.findById(animalId2);
			aviary.setFirstAnimal(animal1);
			aviary.setSecondAnimal(animal2);
			list.add(aviary);
		}
		//одиночные вольеры
		for (Long id: doneMap.keySet()) {
			if (i < forAviaries && !doneMap.get(id)) {
				Aviary aviary = new Aviary();
				Long animalId1 = id; doneMap.put(animalId1, true);
				Animal animal1 = animalService.findById(animalId1);
				aviary.setFirstAnimal(animal1);
				list.add(aviary);
			}
		}
		return list;
	}

}
