package com.zoo.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.math.BigInteger;
import javax.persistence.Tuple;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.zoo.data.AviaryRepository;
import com.zoo.data.PlanRepository;
import com.zoo.domain.Animal;
import com.zoo.domain.Aviary;
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
        } else {
          aviary.setFirstAnimal(animal1);
          aviary.setSecondAnimal(animal2);
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
		
		Map<Long, Boolean> animalInAviaryMap = generateMapAnimalsInAviaries();
		
		List<Tuple> pairs = aviaryRepo.groupPairs();
		
		List<Aviary> aviaries = allocateByFrequency(pairs, animalInAviaryMap, forAviaries);
		
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
			List<Tuple> pairs, 
			Map<Long, Boolean> animalInAviaryMap,
			int aviariesCount) {
		List<Aviary> aviariesList = new ArrayList<>(aviariesCount);
		int filledAviariesCount = putPairs(pairs, animalInAviaryMap, aviariesList, aviariesCount);
    int animalsInAviariesCount = 2 * filledAviariesCount;
		
    // all available aviaries are filled with pairs
    if (aviariesCount == filledAviariesCount) return aviariesList;
    
    // not all the aviaries are filled, but no more free animals available
    if (animalsInAviariesCount == animalInAviaryMap.size()) return aviariesList;
    
    // there are empty aviaries and free animals, 
    // first of all let's allocate by a scheme: one free animal -> one free aviary)
    int halfFilledAviariesCount = putOneByOne(animalInAviaryMap, aviariesList, 
                                              aviariesCount-filledAviariesCount);
    animalsInAviariesCount += halfFilledAviariesCount;
                
    // here all animals are allocated by aviaries (doubles or singles)
    if (animalsInAviariesCount == animalInAviaryMap.size()) return aviariesList;
    
    // there are still free animals
    int newFilledAviariesCount = fillHalfFilledAviaries(animalInAviaryMap, aviariesList,
                                                    halfFilledAviariesCount);
    filledAviariesCount += newFilledAviariesCount;
    halfFilledAviariesCount -= newFilledAviariesCount;
    animalsInAviariesCount += newFilledAviariesCount;
    
    System.out.println("Aviary animals: " + animalsInAviariesCount);
		return aviariesList;
	}
  
  private int putPairs(List<Tuple> pairs,
                       Map<Long, Boolean> animalInAviaryMap, 
                       List<Aviary> aviariesList, 
                       int aviariesCount) {
    int filledAviariesCount = 0;
    for (int i = 0; i < Math.min(aviariesCount, pairs.size()); i++) {
			Aviary aviary = new Aviary();
			Tuple pair = pairs.get(i);  
      
			Long animalId1 = ((BigInteger)pair.get("firstAnimal")).longValue(); 
      if (animalInAviaryMap.get(animalId1)) continue;      
      
			Long animalId2 = ((BigInteger)pair.get("secondAnimal")).longValue();
      if (animalInAviaryMap.get(animalId2)) continue;
      
      animalInAviaryMap.put(animalId1, true); 
      animalInAviaryMap.put(animalId2, true);
      
			Animal animal1 = animalService.findById(animalId1);
			Animal animal2 = animalService.findById(animalId2);
			aviary.setFirstAnimal(animal1);
			aviary.setSecondAnimal(animal2);
			aviariesList.add(aviary);
      filledAviariesCount++;
		}
    return filledAviariesCount;
  }
  
  private int putOneByOne(Map<Long, Boolean> animalInAviaryMap, 
                          List<Aviary> aviariesList, 
                          int aviariesAvailableCount) {
    int halfFilledAviariesCount = 0;   
    for (Long id: animalInAviaryMap.keySet()) {
			if (halfFilledAviariesCount < aviariesAvailableCount && !animalInAviaryMap.get(id)) {
				Aviary aviary = new Aviary();
				Long animalId1 = id; 
        animalInAviaryMap.put(animalId1, true);
				Animal animal1 = animalService.findById(animalId1);
				aviary.setFirstAnimal(animal1);
				aviariesList.add(aviary);
        halfFilledAviariesCount++;
			}
		}
    return halfFilledAviariesCount;
  }
  
  private int fillHalfFilledAviaries(Map<Long, Boolean> animalInAviaryMap, 
                                 List<Aviary> aviariesList,
                                 int halfFilledAviariesCount) {
    int newFilledAviariesCount = 0;
    for (Long animalId: animalInAviaryMap.keySet()) {   
      
			if (!animalInAviaryMap.get(animalId)) {
        Animal animal = animalService.findById(animalId);
        for (int i = aviariesList.size() - halfFilledAviariesCount; 
                  i < aviariesList.size(); i++) {
          Aviary aviary = aviariesList.get(i);
          Animal second = aviary.getSecondAnimal();
          if (second == null && 
              aviary.getFirstAnimal().isPredator() == animal.isPredator()) {
            aviary.setSecondAnimal(animal);
            newFilledAviariesCount++;
          }
        }				
			}
		}
    return newFilledAviariesCount;
  }
}
