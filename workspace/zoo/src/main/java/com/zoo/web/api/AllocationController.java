package com.zoo.web.api;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zoo.domain.Aviary;
import com.zoo.domain.Plan;
import com.zoo.services.AllocationService;

@RestController
@RequestMapping(path="/allocation", produces="application/json")
@CrossOrigin(origins = "*")
public class AllocationController {
	
	private AllocationService allocationService;
	
	public AllocationController(AllocationService allocationService) {
		this.allocationService = allocationService;
	}

	// приходят идентификаторы сгруппированные по вольерам
	@PostMapping
	public ResponseEntity<Plan> createPlan(@RequestBody List<List<Long>> idsByAviaries) {
		try {
			return allocationService.createPlan(idsByAviaries);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/{forAviaries}")
	public ResponseEntity<List<Aviary>> generatePlan(@PathVariable("forAviaries") int forAviaries) {
		try {
			return allocationService.generatePlan(forAviaries);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.CONFLICT);
		}
	}
}
