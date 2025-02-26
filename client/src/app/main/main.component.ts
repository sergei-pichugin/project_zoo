import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { Animal } from '../animal';
import { AnimalService } from '../services/animal/animal.service';
import { PlanService } from '../services/plan/plan.service';
import { AviaryService } from '../services/aviary/aviary.service';
import { SettingsComponent } from '../settings/settings.component';
import { AnimalComponent } from '../animal/animal.component';
import {MatButtonModule} from '@angular/material/button';
import {NgFor} from "@angular/common";
import { HttpClientModule} from "@angular/common/http";
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-main',
  imports: [SettingsComponent, CdkDrag, CdkDropList, CdkDropListGroup, AnimalComponent, NgFor, 
    MatButtonModule, MatCardModule, HttpClientModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  providers: [AnimalService, PlanService, AviaryService]
})
export class MainComponent implements OnInit {
  animals: Array<any> = [];
  aviaries: Array<any> = [];
  readonly maxAviariesNumber = 1000;
  
  constructor(private router: Router,
              private animalService: AnimalService,
              private planService: PlanService,
              private aviaryService: AviaryService) { }
              
  ngOnInit() {    
    this.animalService.getAll().subscribe((data: any[]) => {
      this.animals = data;
    });
    this.aviaries = this.aviaryService.getAviaryBuffer();
    console.log(this.aviaries);
  }

  onAviariesChanged(event: Event) {
    let input: HTMLInputElement = event.target as HTMLInputElement;
    let newAviariesNumber = +input.value;
    if (newAviariesNumber < 0 || 
        newAviariesNumber == this.aviaries.length || 
        newAviariesNumber > this.maxAviariesNumber) {
      input.value = ""+this.aviaries.length;
    } else {
      this.aviaryService
        .changeAviaries(this.aviaries, newAviariesNumber)
        .subscribe({
          next:(data: any) => { 
            this.aviaries = data; 
            if (+input.value != this.aviaries.length) {
              input.value = ""+this.aviaries.length;
            }
          },
          error: error => console.log(error)
        });
    }
  }   

  onClosedFromAviary(animal: Animal) {
    this.removeFromAviaries(animal.id);
  }
  
  onClosedFromAnimals(animal: Animal) {
    this.removeFromZoo(animal.id);
  }

  removeFromZoo(id: number) {
      this.animalService.remove(id).subscribe((data: any[]) => {
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

  drop(event: CdkDragDrop<Animal[]>) {
    this.aviaryService.drop(event, this.aviaries);
  }

  save() {
    console.log(this.aviaries);
    this.planService.save(this.aviaries).subscribe(
      (data: any) => {
        alert('сохранён план распределения');
        console.log(data);
    });
  }

  generate() {
    console.log('sending request to generation');
    this.planService.generate(this.aviaries.length).subscribe((data: any[]) => {
      console.log(data);
      this.aviaries = [];
      data.forEach(av => {
        av.secondAnimal ?
        this.aviaries.push({animals: [av.firstAnimal, av.secondAnimal]}) :
        this.aviaries.push({animals: [av.firstAnimal]});
      });
    });
  }
  
  addAnimal() {
    this.aviaryService.setAviaryBuffer(this.aviaries);
    this.router.navigate(['/animal-add']);
  }
}
