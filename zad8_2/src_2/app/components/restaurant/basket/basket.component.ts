import { Component, Input, OnChanges } from '@angular/core';
import { DishesService } from 'src/app/dishes.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent implements OnChanges {
  @Input() basket: DishesService[] = [];
  @Input() total: number = 0;
  sum: number = 0;

  constructor() {}

  ngOnChanges(): void {
    this.total = 0;
    this.sum = 0;
    for (const dish of this.basket) {
      this.total += dish.inBasket;
      this.sum += dish.inBasket * dish.priceUSD;
    }
    this.sum = Math.round(this.sum * 100) / 100;
  }
}
