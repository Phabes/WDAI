import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BasketDish } from 'src/models/basketDish';
import { Dish } from 'src/models/dish';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  subject = new Subject();
  basket: BasketDish[] = [];

  constructor() {}

  setUserBasket(basket: BasketDish[]) {
    this.basket = basket;
  }

  addDish(dish: Dish): void {
    let obj = {
      dish: dish,
      action: 'add',
    };
    let index = null;
    for (let i = 0; i < this.basket.length; i++) {
      if (dish._id == this.basket[i].dish._id) {
        index = i;
        break;
      }
    }
    if (index == null) {
      let newBasketDish: BasketDish = {
        dish: dish,
        quantity: 1,
      };
      this.basket.push(newBasketDish);
    } else this.basket[index].quantity++;
    this.subject.next(obj);
  }

  deleteDish(dish: Dish): void {
    let obj = {
      dish: dish,
      action: 'delete',
    };
    for (let i = 0; i < this.basket.length; i++) {
      if (dish._id == this.basket[i].dish._id) {
        this.basket[i].quantity--;
        if (this.basket[i].quantity == 0) this.basket.splice(i, 1);
        break;
      }
    }
    this.subject.next(obj);
  }

  removeDish(dish: Dish): void {
    let obj = {
      dish: dish,
      action: 'removeFromBasket',
    };
    for (let i = this.basket.length - 1; i >= 0; i--) {
      if (dish._id == this.basket[i].dish._id) this.basket.splice(i, 1);
    }
    this.subject.next(obj);
  }

  clearBasket(): void {
    this.basket = [];
    this.subject.next('BASKET_CLEARED');
  }

  getMsg(): any {
    return this.subject.asObservable();
  }

  getBasket(): BasketDish[] {
    return this.basket;
  }
}
