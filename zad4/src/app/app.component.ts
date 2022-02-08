import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'LABS';
  words: string[] = ['Ala', 'ma', 'kota'];
  numbers: number[] = [0, 1, 2, 3];
}
