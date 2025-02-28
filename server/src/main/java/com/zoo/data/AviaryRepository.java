package com.zoo.data;

import java.util.List;
import jakarta.persistence.Tuple;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.zoo.domain.Aviary;

@CrossOrigin(origins = "*")
public interface AviaryRepository extends CrudRepository<Aviary, Long>  {

	@Query(value="select first_animal as firstAnimal, "
			+ "second_animal as secondAnimal, "
			+ "count(*) as frequency "
			+ "from aviary "
			+ "group by firstAnimal, secondAnimal "
      		+ "having first_animal is not null and second_animal is not null "
			+ "order by frequency desc ", nativeQuery=true)
	List<Tuple> groupPairs();

}
