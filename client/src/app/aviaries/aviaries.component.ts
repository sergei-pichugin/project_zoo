import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Animal } from '../animal';

@Component({
  selector: 'app-aviaries',
  templateUrl: './aviaries.component.html',
  styleUrls: ['./aviaries.component.css']
})
export class AviariesComponent implements OnInit {

	constructor() {
	}
	
	ngOnInit() {}

  animals = [];

  drop(event: CdkDragDrop<string[]>) {
		console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
