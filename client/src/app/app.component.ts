import { Component } from '@angular/core';
import { AviariesCountComponent } from './aviaries-count/aviaries-count.component';

@Component({
  selector: 'app-root',
  imports: [AviariesCountComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
  avcount: number|null = null;

  onAvcountChanged(newavcount: number|null) {
    this.avcount = newavcount;
    console.log('avcount changed to ' + this.avcount);
  }
}
