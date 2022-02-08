import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DishesService } from 'src/app/dishes.service';

@Component({
  selector: 'app-single-dish',
  templateUrl: './single-dish.component.html',
  styleUrls: ['./single-dish.component.css'],
})
export class SingleDishComponent implements OnInit {
  @Input() dish: DishesService = new DishesService();
  @Input() rate: number = 1;
  @Output() addToBasketClick = new EventEmitter();
  @Output() removeFromBasketClick = new EventEmitter();
  @Output() removeDishClick = new EventEmitter();
  starsGiven: number = 0;
  stars: string[] = [
    'emptyStar.png',
    'emptyStar.png',
    'emptyStar.png',
    'emptyStar.png',
    'emptyStar.png',
  ];

  constructor() {}

  ngOnInit(): void {}

  addButtonClick(): void {
    this.addToBasketClick.emit();
  }

  removeButtonClick(): void {
    this.removeFromBasketClick.emit();
  }

  removeDishButtonClick(): void {
    this.removeDishClick.emit();
  }

  setStars(starIndex: number): void {
    starIndex++;
    this.starsGiven = starIndex;
    for (let i = 0; i < this.stars.length; i++) {
      if (i < starIndex) this.stars[i] = 'star.png';
      else this.stars[i] = 'emptyStar.png';
    }
  }
}
