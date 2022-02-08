import { Injectable } from '@angular/core';
import dishes from './data/dishes.json';

@Injectable({
  providedIn: 'root',
})
export class DishesService {
  name: string = '';
  kitchenType: string = '';
  category: string = '';
  products: any[] = [];
  available: number = 0;
  priceUSD: number = 0;
  description: string = '';
  url: string = '';
  inBasket: number = 0;
  hide: boolean = false;
  color: string = 'none';
  priceSymbol: string = '$';
  constructor() {}

  getDishes() {
    return dishes;
  }
}
