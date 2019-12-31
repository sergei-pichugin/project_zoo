import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../shared/animal/animal.service';
import { PlanService } from '../shared/plan/plan.service';
import { AviaryService } from '../shared/aviary/aviary.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem, 
         copyArrayItem, CdkDropList} from '@angular/cdk/drag-drop';
import { Animal } from '../animal';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

	animals: Array<any>;
	aviaries: Array<any> = [{animals: []}, {animals: []}];
  readonly maxAviariesNumber = 1000;
	
	onAviariesChanged(event) {
    let newAviariesNumber = event.target.value;
    if (newAviariesNumber < 0 || 
        newAviariesNumber == this.aviaries.length || 
        newAviariesNumber > this.maxAviariesNumber) {
      event.target.value = this.aviaries.length;
    } else {
      this.aviaryService
      .changeAviaries(this.aviaries, newAviariesNumber)
      .subscribe(data => {
          this.aviaries = data;   
          if (event.target.value != this.aviaries.length) {
            event.target.value = this.aviaries.length;
          }
        });
    }
	}  

  constructor(private animalService: AnimalService,
							private planService: PlanService,
              private aviaryService: AviaryService) { }

  ngOnInit() {
		this.animalService.getAll().subscribe(data => {
			this.animals = data;
		});		
  }
	
	onClosedFromAviary(animal) {
		this.removeFromAviaries(animal.id);
	}
  
  onClosedFromAnimals(animal) {
    this.removeFromZoo(animal.id);
  }
	
	removeFromZoo(id: number) {
		this.animalService.remove(id).subscribe(data => {
			this.animals = data;
      this.removeFromAviaries(id);
		});
	}
  
  removeFromAviaries(animalId: number) {
    for (let i = 0; i < this.aviaries.length; i++) {
      for (let j = 0; j < this.aviaries[i].animals.length; j++) {
        if (this.aviaries[i].animals[j].id == animalId) {
          this.aviaries[i].animals.splice(j, 1);
        }
      }
    }
  }
	
	drop(event: CdkDragDrop<string[]>) {
		console.log(event);    
    if (event.previousContainer === event.container) { // inside the same container - index changing
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if (event.container.element.nativeElement
                .classList.contains('animal-list')) {  // cannot drop from aviaries to free-animals
      // do nothing          
    } else if (event.previousContainer.element.nativeElement
                .classList.contains('aviary-list')) {  // from one aviary to another - transfer
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    } else {                                          // from free-animals to aviaries - copy
      let animalId: number = event.previousContainer.data[event.previousIndex].id;
      if (this.checkAviaryNewbie(animalId)) {
        copyArrayItem(event.previousContainer.data,
                    event.container.data,
                    event.previousIndex,
                    event.currentIndex);
      }      
    }
  }
  
  // only one concrete animal for the zoo
  checkAviaryNewbie(animalId: number) {
    for (let i = 0; i < this.aviaries.length; i++) {
      for (let j = 0; j < this.aviaries[i].animals.length; j++) {
        if (this.aviaries[i].animals[j].id == animalId) {
          return false;
        }
      }
    }
    return true;
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
