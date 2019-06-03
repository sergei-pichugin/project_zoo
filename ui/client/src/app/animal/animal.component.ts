import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Animal } from '../animal';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {

	@Input() animal: Animal;
	@Output() closed = new EventEmitter<any>();
	
  constructor() { }

  ngOnInit() {
  }
	
	close() {
		this.closed.emit(this.animal);
	}

}
