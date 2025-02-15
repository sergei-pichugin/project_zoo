import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
	
  @Input() mainAviaries: number|null = null;
  @Output() changed = new EventEmitter<Event>();
	
  change(event: Event) {
    this.changed.emit(event);
  }

}
