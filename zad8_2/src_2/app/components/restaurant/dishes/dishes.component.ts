import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DishesService } from 'src/app/dishes.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css'],
})
export class DishesComponent implements OnInit {
  @Input() dishes: DishesService[] = [];
  @Input() rate: number = 1;
  @Output() addDishClick = new EventEmitter<number>();
  @Output() removeDishClick = new EventEmitter<number>();
  total: number = 0;
  currency: number = 0; // 0 - $, 1 - €

  constructor() {}

  ngOnInit(): void {
    console.log(this.dishes);
    let expensiveIndex = this.findMostExpensive();
    let cheapIndex = this.findCheapest();
    if (expensiveIndex != cheapIndex) {
      this.dishes[expensiveIndex].color = 'red';
      this.dishes[cheapIndex].color = 'green';
    }
  }

  findMostExpensive(): number {
    let index = 0;
    for (let i = 1; i < this.dishes.length; i++) {
      if (this.dishes[i].priceUSD > this.dishes[index].priceUSD) index = i;
    }
    return index;
  }

  findCheapest(): number {
    let index = 0;
    for (let i = 1; i < this.dishes.length; i++) {
      if (this.dishes[i].priceUSD < this.dishes[index].priceUSD) index = i;
    }
    return index;
  }

  addDish(dishIndex: number): void {
    this.addDishClick.emit(dishIndex);
  }

  removeDish(dishIndex: number): void {
    this.removeDishClick.emit(dishIndex);
  }

  changeCurrency(e: any): void {
    if (e.target.value == 'USD') {
      this.currency = 0;
      this.rate = 1;
      this.changeDishesCurrency('$');
    } else {
      this.currency = 1;
      this.rate = 0.8861;
      this.changeDishesCurrency('€');
    }
  }

  changeDishesCurrency(symbol: string): void {
    for (const dish of this.dishes) {
      dish.priceSymbol = symbol;
    }
  }
}
