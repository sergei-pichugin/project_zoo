import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
	public API = '//localhost:8080';
	public ALLOCATION_API = this.API + '/allocation';
	
  constructor(private http: HttpClient) { }
	
	save(aviaries: any): Observable<any> {
		console.log('plan service saves');
		let result: Observable<Object>;
		let idsByAviaries = [];
		for (let i = 0; i < aviaries.length; i++) {
			let aviaryIds = [];
			console.log('aviary animals: ' + aviaries[i].animals);
			if (aviaries[i].animals.length > 0) aviaryIds.push(aviaries[i].animals[0].id);
			if (aviaries[i].animals.length > 1) aviaryIds.push(aviaries[i].animals[1].id);
			idsByAviaries.push(aviaryIds);
		}		
		console.log(idsByAviaries);
		result = this.http.post(this.ALLOCATION_API, idsByAviaries);
		return result;
	}
	
	generate(forAviaries: number): Observable<any> {
		return this.http.get(this.ALLOCATION_API + '/' + forAviaries);
	}
}
