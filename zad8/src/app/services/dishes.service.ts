import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Dish } from '../../models/dish';
import { MockData } from '../../mock-data/mock-dish-data';

@Injectable({
  providedIn: 'root',
})
export class DishesService {
  subject = new Subject();
  dishes: Dish[] = [];
  lastID: number = 0;
  currency: string = '$';
  rate: number = 1;
  last: Dish[] = [];
  constructor() {
    this.dishes = MockData.Dishes;
    for (const dish of this.dishes) {
      if (dish.dishID > this.lastID) this.lastID = dish.dishID;
    }
  }

  getDishes() {
    return this.dishes;
  }

  filterDishesByPrice(
    from: number,
    to: number,
    kitchenTypesChoosen: string[],
    categoriesChoosen: string[],
    minStars: number
  ) {
    let found = this.dishes.filter((dish: Dish) => {
      return (
        Math.round(dish.priceUSD * this.rate * 100) / 100 <= to &&
        Math.round(dish.priceUSD * this.rate * 100) / 100 >= from
      );
    });
    found = found.filter((dish: Dish) => {
      return kitchenTypesChoosen.includes(dish.kitchenType);
    });
    found = found.filter((dish: Dish) => {
      return categoriesChoosen.includes(dish.category);
    });
    found = found.filter((dish: Dish) => {
      return dish.avgStars >= minStars;
    });
    let obj = {
      dish: found,
      action: 'filtered',
    };
    this.subject.next(obj);
    return obj;
  }

  getLastID(): number {
    return this.lastID;
  }

  addDish(data: any) {
    this.dishes.push({
      dishID: this.getLastID() + 1,
      name: data.name,
      kitchenType: data.kitchenType,
      category: data.category,
      products: data.products,
      available: data.available,
      priceUSD: data.priceUSD,
      description: data.description,
      url: data.url,
      avgStars: 5,
    });
    this.sendMsg(this.dishes[this.dishes.length - 1]);
  }

  getMsg(): any {
    return this.subject.asObservable();
  }

  sendMsg(dish: any): void {
    let obj = {
      dish: dish,
      action: 'added',
    };
    this.subject.next(obj);
  }

  sendMsg2(dish: any): void {
    let obj = {
      dish: dish,
      action: 'filtered',
    };
    this.subject.next(obj);
  }

  sendMsg3(currency: string): void {
    this.currency = currency;
    if (currency == '$') {
      this.rate = 1;
    } else {
      this.rate = 0.8861;
    }
  }

  sendMsg4(dish: Dish) {
    let obj = {
      dish: dish,
      action: 'removed',
    };
    this.subject.next(obj);
  }
}
