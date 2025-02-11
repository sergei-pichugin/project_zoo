import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
	public API = '//localhost:8080';
	public ANIMAL_API = this.API + '/animals';

  constructor(private http: HttpClient) { }
	
	//getAll(): Observable<any> {
	//	return this.http.get('animals.json');
	//}
	
	getAll(): Observable<any> {
		return this.http.get(this.ANIMAL_API);
	}
	
	save(animal: any): Observable<any> {
		console.log('service saves');
		let result: Observable<Object>;
		if (!animal.name) return null;
		animal.name = animal.name.trim();
		if (animal.name.length < 2) return null;
		animal.name = animal.name.substr(0, 1).toUpperCase() + 
			animal.name.substr(1).toLowerCase();
		result = this.http.post(this.ANIMAL_API, animal);
		return result;
	}
	
	remove(id: number): Observable<any> {
		return this.http.get(this.ANIMAL_API + '/' + id);
	}
}
