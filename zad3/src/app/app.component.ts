import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'LABS';
  name: string = 'Daniel';
  surname: string = 'Craig';
  filmTitle: string = 'No time to die';
  a: number = 2 + 3;
  window: string = window.location.href;
}
