import { Component, Input, OnChanges } from '@angular/core';
import { DishesService } from 'src/app/dishes.service';
import { Dish } from '../../../../models/dish';

interface Dish2 extends Dish {
  inBasket: number;
  hide: boolean;
  color: string;
  priceSymbol: string;
}

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent implements OnChanges {
  @Input() basket: Dish2[] = [];
  @Input() total: number = 0;
  @Input() rate: number = 1;
  @Input() currency: string = '$';
  sum: number = 0;
  symbol: string = '$';

  constructor() {}

  ngOnChanges(): void {
    this.total = 0;
    this.sum = 0;
    for (const dish of this.basket) {
      this.total += dish.inBasket;
      this.sum +=
        (dish.inBasket * Math.round(dish.priceUSD * this.rate * 100)) / 100;
    }
  }
}
