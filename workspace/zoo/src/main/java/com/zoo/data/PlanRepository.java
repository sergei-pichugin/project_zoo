package com.zoo.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.zoo.domain.Plan;

@CrossOrigin(origins = "*")
public interface PlanRepository extends CrudRepository<Plan, Long> {

}
