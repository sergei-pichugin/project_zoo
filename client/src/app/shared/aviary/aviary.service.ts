import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CdkDragDrop, moveItemInArray, transferArrayItem, 
         copyArrayItem, CdkDropList} from '@angular/cdk/drag-drop';
import { Animal } from '../../animal';

@Injectable({
  providedIn: 'root'
})
export class AviaryService {

  public constructor() { 
  }
  
  public changeAviaries(aviaries, newAviariesNumber) : Observable<any> {    
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
  }
  
  public drop(event: CdkDragDrop<Animal[]>, aviaries: Array<any>) {
    let dragContainer = event.previousContainer;
    let dropContainer = event.container;
    let dragData = event.previousContainer.data;
    let dropData = event.container.data;   
    let dragIndex = event.previousIndex;
    let dropIndex = event.currentIndex;
  
    let method = this.chooseDragDropMethod(dragContainer, dropContainer);
    if (!method) return;
    
    let checked = this.checkDragDropConditions(
                    method, dragData, dropData, dragIndex, dropIndex, aviaries);
    if (!checked) return;
    
    this.doDrop(method, dragData, dropData, dragIndex, dropIndex);
  }
  
  private addEmptyAviaries(aviaries, newAviariesNumber) {
    let emptyAviariesNumber = newAviariesNumber - aviaries.length;
    let newAviaries = [];
    this.copy(newAviaries, aviaries);
    for (let i = 0; i < emptyAviariesNumber; i++) {
      newAviaries.push({animals: []});
    }
    return newAviaries;
  }
  
  private removeEmptyAviaries(aviaries, newAviariesNumber) {
    let newAviaries = [];
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
  
  private isEmptyAviary(aviary) {
    if (!aviary.animals || !aviary.animals.length) {
      return true;
    }
    return false;
  }
  
  private copy(newAviaries, aviaries) {
    if (!aviaries || !aviaries.length) {
      return newAviaries;
    }
    aviaries.forEach(function(item) {
      newAviaries.push(item);
    });
    return newAviaries;
  }
  
  private chooseDragDropMethod(dragContainer, dropContainer) {
    if (dragContainer === dropContainer) {                       // inside the same container - index changing
      return moveItemInArray;
    } else if (dropContainer.element.nativeElement
                .classList.contains('animal-list')) {  // cannot drop from aviaries to free-animals
      return null;        
    } else if (dragContainer.element.nativeElement
                .classList.contains('aviary-list')) {  // from one aviary to another - transfer
      return transferArrayItem;
    } else {                                           // from free-animals to aviaries - copy        
        return copyArrayItem;     
    }
  }
  
  private checkDragDropConditions(method, dragData, dropData, 
                                  dragIndex, dropIndex, aviaries) {
    if (method.name === 'moveItemInArray') return true;
        
    if (!this.checkEnoughSpace(dropData)) return false;
    if (!this.checkAnimalCompatibility(dropData, dragData, dragIndex)) return false;
    
    if (method.name === 'copyArrayItem') {
      if (!this.checkAviaryNewbie(aviaries, dragData, dragIndex)) return false;
    }
    
    return true;
  }
  
  private doDrop(method, dragData, dropData, dragIndex, dropIndex) {
    if (dragData === dropData) {
      method(dropData, dragIndex, dropIndex);
    } else {
      method(dragData, dropData, dragIndex, dropIndex);
    }
  }
  
  private checkEnoughSpace(targetAviaryData) : boolean {  
    if (Array.isArray(targetAviaryData)) {
      if (targetAviaryData.length > 1) return false;
    }    
    return true;
  }
  
  // checking that a newcoming animal is compatible with an old-timer of the aviary
  // drag data and index - can refer to animals list or another aviary
  private checkAnimalCompatibility(targetAviaryData, dragData, dragIndex) : boolean {
  
    // target aviary is empty
    if (this.isEmptyAviaryData(targetAviaryData)) return true; 
    
    // target aviary is not empty already
    if (Array.isArray(targetAviaryData) && 
        targetAviaryData[0].hasOwnProperty('predator') && 
        Array.isArray(dragData) &&
        dragData[dragIndex].hasOwnProperty('predator')) {
      if (targetAviaryData[0].predator === dragData[dragIndex].predator) return true;
    }
    return false;
  }
  
  // only one concrete animal for the zoo
  private checkAviaryNewbie(aviaries: Array<any>, animalsData, animalsIndex) {
    if (Array.isArray(animalsData) &&
        animalsData[animalsIndex].hasOwnProperty('id')) {
      for (let i = 0; i < aviaries.length; i++) {
        for (let j = 0; j < aviaries[i].animals.length; j++) {
          if (aviaries[i].animals[j].id == animalsData[animalsIndex].id) {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  }
  
  private isEmptyAviaryData(targetAviaryData) {
    if (Array.isArray(targetAviaryData) && targetAviaryData.length == 0) return true;
    return false;
  }  
}
