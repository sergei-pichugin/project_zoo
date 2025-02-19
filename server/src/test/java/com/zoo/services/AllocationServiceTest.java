package com.zoo.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.zoo.data.AviaryRepository;
import com.zoo.data.PlanRepository;
import com.zoo.domain.Animal;
import com.zoo.domain.Aviary;


@SpringBootTest
class AllocationServiceTest {	
	
	@Mock
	private AnimalService animalService;
	
	@Mock
	private PlanRepository planRepo;
	
	@Mock
	private AviaryRepository aviaryRepo;
	
	@InjectMocks
  private AllocationService allocationService = new AllocationService(
      aviaryRepo, planRepo, animalService);
		
	@Test
	void testGeneratePlan_returnNoHeadersOkForZeroAviaries() {
		ResponseEntity<List<Aviary>> resEntity = allocationService.generatePlan(0);
		assertEquals(HttpStatus.OK, resEntity.getStatusCode());
		assertEquals(0, resEntity.getHeaders().size());
	}
	
	@Test
	void testGenerateMapAnimalsInAviaries_animalsWithFalseInAviary() {
	  List<Animal> animalList = Arrays.asList(new Animal(10, "bull", true, true),
	                                          new Animal(20, "cow", false, true));
	  when(animalService.findActiveAnimals()).thenReturn(animalList);	  
	  Map<Long, Boolean> map = allocationService.generateMapAnimalsInAviaries();
	  assertEquals(2, map.size());
	  assertFalse(map.get(10L));
	  assertFalse(map.get(20L));
	}
	
}
