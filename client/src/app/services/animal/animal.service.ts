import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  public API = '//localhost:8080';
  public ANIMAL_API = this.API + '/animals';

  constructor(private http: HttpClient) { }
	
	// getAll(): Observable<any> {
	// 	return this.http.get('data.json');
	// }
	
	getAll(): Observable<any> {
		return this.http.get(this.ANIMAL_API);
	}
	
	save(animal: any): Observable<any> {
		console.log('service saves');
		if (!animal.name) return EMPTY;
		animal.name = animal.name.trim();
		if (animal.name.length < 2) return EMPTY;
		animal.name = animal.name.substr(0, 1).toUpperCase() + 
			animal.name.substr(1).toLowerCase();
		return this.http.post(this.ANIMAL_API, animal);
	}
	
	remove(id: number): Observable<any> {
		return this.http.get(this.ANIMAL_API + '/' + id);
	}
}

