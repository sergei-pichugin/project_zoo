import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AviaryService {

  constructor() { 
  }
  
  changeAviaries(aviaries, newAviariesNumber) : Observable<any> {    
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
  
  addEmptyAviaries(aviaries, newAviariesNumber) {
    let emptyAviariesNumber = newAviariesNumber - aviaries.length;
    let newAviaries = [];
    this.copy(newAviaries, aviaries);
    for (let i = 0; i < emptyAviariesNumber; i++) {
      newAviaries.push({animals: []});
    }
    return newAviaries;
  }
  
  removeEmptyAviaries(aviaries, newAviariesNumber) {
    let newAviaries = [];
    this.copy(newAviaries, aviaries);
    for (let i = 0; i < newAviaries.length; i++) {
      let av = newAviaries[i];
      if (this.isEmpty(av)) {
        newAviaries.splice(i, 1);   
        i--;
        if (newAviaries.length == newAviariesNumber) {
          break;
        }
      }
    }
    return newAviaries;
  }
  
  isEmpty(aviary) {
    if (!aviary.animals || !aviary.animals.length) {
      return true;
    }
    return false;
  }
  
  copy(newAviaries, aviaries) {
    if (!aviaries || !aviaries.length) {
      return newAviaries;
    }
    aviaries.forEach(function(item) {
      newAviaries.push(item);
    });
    return newAviaries;
  }
}
