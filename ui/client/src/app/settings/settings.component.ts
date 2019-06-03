import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
	
	@Input() mainAviaries: number;
	@Output() changed = new EventEmitter<number>();
	
	change(event) {
		this.changed.emit(event);
	}
	
	constructor() { }

  ngOnInit() {
  }

}
