package com.zoo.data;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.zoo.domain.Aviary;
import com.zoo.domain.AviaryReport;

@CrossOrigin(origins = "*")
public interface AviaryRepository extends CrudRepository<Aviary, Long>  {

	@Query(value="select first_animal as firstAnimal, "
			+ "second_animal as secondAnimal, "
			+ "count(*) as frequency"
			+ "from aviary "
			+ "group by first_animal, second_animal "
			+ "order by frequency desc", nativeQuery=true)
	List<AviaryReport> groupPairs();

}
