import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-zad4',
  templateUrl: './zad4.component.html',
  styleUrls: ['./zad4.component.css'],
})
export class Zad4Component implements OnInit {
  constructor() {}

  @Input() words: string[] = [];
  @Input() numbers: number[] = [];

  tabliczka(a: string[], b: number[]): void {
    for (let word of a) {
      for (let i in b) {
        console.log(word + b[i]);
      }
    }
  }

  ngOnInit(): void {
    this.tabliczka(this.words, this.numbers);
  }
}
