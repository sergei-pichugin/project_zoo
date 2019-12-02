import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../shared/animal/animal.service';
import { PlanService } from '../shared/plan/plan.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList} from '@angular/cdk/drag-drop';
import { Animal } from '../animal';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

	settingAviaries: number = 2;
	animals: Array<any>;
	aviaries: Array<any> = [{animals: []}, {animals: []}];
	
	onSettingAviariesChanged(event) {
		this.settingAviaries = event.target.value;
		this.aviaries = [];
		for (let i = 0; i < this.settingAviaries; i++) {
			this.aviaries.push({animals: []});
		}
		console.log('new main aviaries: ' + this.settingAviaries);
	}  

  constructor(private animalService: AnimalService,
							private planService: PlanService) { }

  ngOnInit() {
		this.animalService.getAll().subscribe(data => {
			this.animals = data;
		});
		
  }
	
	onClosed(animal: Animal) {
		this.remove(animal.id);
	}
	
	remove(id: number) {
		this.animalService.remove(id).subscribe(data => {
			this.animals = data;
		});
	}
	
	drop(event: CdkDragDrop<string[]>) {
		console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

	save() {
		console.log(this.aviaries);
		this.planService.save(this.aviaries).subscribe(
		data => {
			alert('сохранён план распределения');
			console.log(data);
		});
	}
	
	generate() {
		console.log('sending request to generation');
		this.planService.generate(this.aviaries.length).subscribe(data => {
			console.log(data);
			this.aviaries = [];
			data.forEach(av => {
				this.aviaries.push({animals: [av.firstAnimal, av.secondAnimal]});
			});
		});
	}
}