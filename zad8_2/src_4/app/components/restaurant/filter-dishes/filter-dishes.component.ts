import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DishesService } from 'src/app/dishes.service';
import { Dish } from '../../../../models/dish';

// interface Dish2 extends Dish {
//   inBasket: number;
//   hide: boolean;
//   color: string;
//   priceSymbol: string;
// }

@Component({
  selector: 'app-filter-dishes',
  templateUrl: './filter-dishes.component.html',
  styleUrls: ['./filter-dishes.component.css'],
})
export class FilterDishesComponent implements OnInit {
  // @Input() dishes: Dish2[] = [];
  // @Input() len: number = 0;
  @Output() filterDishes = new EventEmitter<Dish[]>();
  dishes: Dish[] = [];
  kitchenTypes: string[] = [];
  miniPrice: number = 0;
  maxiPrice: number = 0;
  fromPrice: number = 0;
  toPrice: number = 0;

  constructor(public dishess: DishesService) {}

  ngOnInit(): void {
    this.dishes = this.dishess.getDishes();
    for (const dish of this.dishes) {
      if (!this.kitchenTypes.includes(dish.kitchenType)) {
        this.kitchenTypes.push(dish.kitchenType);
      }
    }
    this.maxiPrice = this.findHighestPrice();
    this.miniPrice = this.findLowestPrice();
    this.fromPrice = this.miniPrice;
    this.toPrice = this.maxiPrice;
  }

  findHighestPrice(): number {
    return this.dishes.reduce(function (prev, curr) {
      return prev.priceUSD > curr.priceUSD ? prev : curr;
    }).priceUSD;
  }

  findLowestPrice(): number {
    return this.dishes.reduce(function (prev, curr) {
      return prev.priceUSD < curr.priceUSD ? prev : curr;
    }).priceUSD;
  }

  filter(): void {
    console.log('FILTRUJ');
    let foundDishes = this.dishess.filterDishesByPrice(
      this.fromPrice,
      this.toPrice
    );
    console.log(foundDishes);
    this.filterDishes.emit(foundDishes);
  }

  miniChange(input: any): void {
    const val = input.target.value;
    if (val == '') this.fromPrice = this.miniPrice;
    else if (!isNaN(val)) {
      if (
        val >= this.miniPrice &&
        val <= this.maxiPrice
        // val <= this.toPrice
      ) {
        this.fromPrice = val;
      }
    } else this.fromPrice = this.miniPrice;
  }

  maxiChange(input: any): void {
    const val = input.target.value;
    if (val == '') this.toPrice = this.maxiPrice;
    else if (!isNaN(val)) {
      if (
        val >= this.miniPrice &&
        val <= this.maxiPrice
        // val >= this.fromPrice
      ) {
        this.toPrice = val;
      }
    } else this.toPrice = this.maxiPrice;
  }
}
