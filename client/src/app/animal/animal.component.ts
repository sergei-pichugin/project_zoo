import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from "@angular/common";

import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

import { Animal } from '../animal';


@Component({
  selector: 'app-animal',
  imports: [NgClass, MatCardModule, MatIconModule],
  templateUrl: './animal.component.html',
  styleUrl: './animal.component.css'
})
export class AnimalComponent {

  @Input() animal: Animal|null = null;
	@Output() closed = new EventEmitter<any>();
	
  close() {
		this.closed.emit(this.animal);
	}
}