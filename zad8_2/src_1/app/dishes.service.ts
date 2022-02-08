import { Injectable } from '@angular/core';
import dishes from './data/dishes.json';

@Injectable({
  providedIn: 'root',
})
export class DishesService {
  constructor() {}

  getDishes() {
    return dishes;
  }
}
