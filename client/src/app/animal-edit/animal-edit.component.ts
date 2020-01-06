import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from '../shared/animal/animal.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-animal-edit',
  templateUrl: './animal-edit.component.html',
  styleUrls: ['./animal-edit.component.css']
})
export class AnimalEditComponent implements OnInit {
	animal: any = {};
	
	sub: Subscription;
	
  constructor(private route: ActivatedRoute,
							private router: Router,
							private animalService: AnimalService) { }
  
  ngOnInit() { }
	
	goToList() {
		this.router.navigate(['/main']);
	}
	
	save(form: NgForm) {
		this.animalService.save(form).subscribe(result => {
			this.goToList();
		}, error => console.error(error));
	}

}
