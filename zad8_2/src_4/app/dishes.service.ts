import { Injectable } from '@angular/core';
// import dishes from './data/dishes.json';
import { Dish } from '../models/dish';
import { MockData } from '../mock-data/mock-dish-data';

@Injectable({
  providedIn: 'root',
})
export class DishesService {
  dishes: Dish[] = [];
  // name: string = '';
  // kitchenType: string = '';
  // category: string = '';
  // products: any[] = [];
  // available: number = 0;
  // priceUSD: number = 0;
  // description: string = '';
  // url: string = '';
  // inBasket: number = 0;
  // hide: boolean = false;
  // color: string = '6px solid white';
  // priceSymbol: string = '$';
  constructor() {
    this.dishes = MockData.Dishes;
  }

  getDishes() {
    return this.dishes;
  }

  filterDishesByPrice(from: number, to: number) {
    return this.dishes.filter((e: Dish) => {
      return e.priceUSD <= to && e.priceUSD >= from;
    });
  }
}
