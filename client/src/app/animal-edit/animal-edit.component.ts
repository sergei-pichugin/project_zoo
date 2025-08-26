import { Component } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AnimalService } from '../services/animal/animal.service';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule} from "@angular/common/http";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-animal-edit',
  templateUrl: './animal-edit.component.html',
  styleUrls: ['./animal-edit.component.css'],
  imports: [MatCardModule, FormsModule, MatCheckboxModule, 
	MatInputModule, MatFormFieldModule, MatButtonModule, 
	RouterModule, HttpClientModule],
  providers: [AnimalService]
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
				error: (error: any) => console.log(error)
			});
	}

}