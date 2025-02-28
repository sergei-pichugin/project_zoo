import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem, 
         copyArrayItem, CdkDropList} from '@angular/cdk/drag-drop';
import { Animal } from '../../animal';

@Injectable({
  providedIn: 'root'
})
export class AviaryService {

  _aviaryBuffer: Array<any> = [{animals: []}, {animals: []}];
  
  public constructor() { 
  }
  
  public setAviaryBuffer(aviaryBuffer: Array<any>) {
    this._aviaryBuffer = aviaryBuffer;
  }
  
  public getAviaryBuffer() : Array<any> {
    return this._aviaryBuffer;
  }

  drop(event: CdkDragDrop<Animal[]>, aviaries: any[]) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if (event.previousContainer.element.nativeElement.classList.contains('animals-list')) {
      if (this.isValidAviaryDropCase(event, aviaries)) {
        copyArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );  
      }      
    } else if (event.previousContainer.element.nativeElement.classList.contains('aviary-list') && 
               event.container.element.nativeElement.classList.contains('aviary-list')) {
      if (this.isValidAviaryDropCase(event, aviaries)) {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      }     
    }
  }

  isValidAviaryDropCase(event: CdkDragDrop<Animal[]>, aviaries: any[]): boolean {    
    if (event.container.data.length > 1) {
      return false;
    }
    const animalToAdd = event.previousContainer.data[event.previousIndex];
    for (let i = 0; i < event.container.data.length; i++) {
      const aviaryAnimal = event.container.data[i];
      if (aviaryAnimal.predator != animalToAdd.predator) {
        return false;
      }
    }
    if (event.previousContainer.element.nativeElement.classList.contains('animals-list')) {
      const allAviariesAnimalsIds = [];
      for (let i = 0; i < aviaries.length; i++) {
        for (let j = 0; j < aviaries[i].animals.length; j++) {
          const aviaryAnimal = aviaries[i].animals[j];
          const id = aviaryAnimal?.id;
          if (id) {
            allAviariesAnimalsIds.push(id);
          }
        }        
      }
      if (allAviariesAnimalsIds.includes(animalToAdd.id)) {
        return false;
      }
    }    
    return true;
  }
  
  public changeAviaries(aviaries: any[], newAviariesNumber: number) {    
    if (newAviariesNumber > aviaries.length) {
      return new Observable(subscriber => {
        subscriber.next(this.addEmptyAviaries(aviaries, newAviariesNumber));
      });
    }
    if (newAviariesNumber < aviaries.length) {
      return new Observable(subscriber => {
        subscriber.next(this.removeEmptyAviaries(aviaries, newAviariesNumber));
      });
    }
    return EMPTY;
  }
  
  private addEmptyAviaries(aviaries: any[], newAviariesNumber: number) {
    let emptyAviariesNumber = newAviariesNumber - aviaries.length;
    let newAviaries: { animals: never[]; }[] = [];
    this.copy(newAviaries, aviaries);
    for (let i = 0; i < emptyAviariesNumber; i++) {
      newAviaries.push({animals: []});
    }
    return newAviaries;
  }
  
  private removeEmptyAviaries(aviaries: any, newAviariesNumber: number) {
    let newAviaries: any[] = [];
    this.copy(newAviaries, aviaries);
    for (let i = 0; i < newAviaries.length; i++) {
      let av = newAviaries[i];
      if (this.isEmptyAviary(av)) {
        newAviaries.splice(i, 1);   
        i--;
        if (newAviaries.length == newAviariesNumber) {
          break;
        }
      }
    }
    return newAviaries;
  }  
  
  private isEmptyAviary(aviary: { animals: string | any[]; }) {
    if (!aviary.animals || !aviary.animals.length) {
      return true;
    }
    return false;
  }
  
  private copy(newAviaries: any[], aviaries: any[]) {
    if (!aviaries || !aviaries.length) {
      return newAviaries;
    }
    aviaries.forEach(function(item: any) {
      newAviaries.push(item);
    });
    return newAviaries;
  } 
}

