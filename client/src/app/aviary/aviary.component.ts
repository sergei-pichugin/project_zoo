import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Animal } from '../animal';

@Component({
  selector: 'app-aviary',
  templateUrl: './aviary.component.html',
  styleUrls: ['./aviary.component.css']
})
export class AviaryComponent implements OnInit {

	constructor() {
	}
	
	ngOnInit() {}

  animals = [
    {id: 14, name: 'Заяц', predator: false}
  ];

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
