import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AnimalService } from '../services/animal/animal.service';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-animal-edit',
  templateUrl: './animal-edit.component.html',
  styleUrls: ['./animal-edit.component.css'],
  imports: [MatCardModule, FormsModule, MatFormFieldModule]
})
export class AnimalEditComponent {
	animal: any = {};
	
  constructor(private router: Router,
							private animalService: AnimalService) { }
  
  ngOnInit() { }
	
	goToList() {
		this.router.navigate(['/main']);
	}
	
	save(form: NgForm) {
		this.animalService.save(form)
			.subscribe({
				next:() => { this.goToList(); },
				error: error => console.log(error)
			});
	}

}