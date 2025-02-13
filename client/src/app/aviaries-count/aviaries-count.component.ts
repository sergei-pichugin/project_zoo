import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-aviaries-count',
  imports: [],
  templateUrl: './aviaries-count.component.html',
  styleUrl: './aviaries-count.component.css'
})
export class AviariesCountComponent {

  @Input() appvalue: number|null = null;
  @Output() changed = new EventEmitter<number>();
	
  change(event: Event) { 
    let input: HTMLInputElement;
    if (event.target) {
      input = event.target as HTMLInputElement;
      this.changed.emit(+input.value);
    }   
    
  }
}
