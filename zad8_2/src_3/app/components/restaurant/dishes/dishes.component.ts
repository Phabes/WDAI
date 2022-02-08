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
  @Output() addToBasketClick = new EventEmitter<number>();
  @Output() removeFromBasketClick = new EventEmitter<number>();
  @Output() removeDishClick = new EventEmitter<number>();
  total: number = 0;

  constructor() {}

  ngOnInit(): void {
    // for (const dish of this.dishes) {
    //   dish.color = 'none';
    // }
    // let expensiveIndex = this.findMostExpensive();
    // let cheapIndex = this.findCheapest();
    // if (expensiveIndex != cheapIndex) {
    //   this.dishes[expensiveIndex].color = 'red';
    //   this.dishes[cheapIndex].color = 'green';
    // }
  }

  // findMostExpensive(): number {
  //   let index = 0;
  //   for (let i = 1; i < this.dishes.length; i++) {
  //     if (this.dishes[i].priceUSD > this.dishes[index].priceUSD) index = i;
  //   }
  //   return index;
  // }

  // findCheapest(): number {
  //   let index = 0;
  //   for (let i = 1; i < this.dishes.length; i++) {
  //     if (this.dishes[i].priceUSD < this.dishes[index].priceUSD) index = i;
  //   }
  //   return index;
  // }

  addToBasket(dishIndex: number): void {
    this.addToBasketClick.emit(dishIndex);
  }

  removeFromBasket(dishIndex: number): void {
    this.removeFromBasketClick.emit(dishIndex);
  }

  removeDish(dishIndex: number): void {
    // this.dishes.splice(dishIndex, 1);
    this.removeDishClick.emit(dishIndex);
  }
}
