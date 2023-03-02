import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Dish } from 'src/models/dish';
import { Commentary } from 'src/models/commentary';
import { AngularFireDatabase } from '@angular/fire/compat/database';


@Injectable({
  providedIn: 'root',
})
export class DishesService {
  dishes: Observable<any[]>;
  subject = new Subject();
  lastID: number = 0;
  currency: string = '$';
  rate: number = 1;
  last: Dish[] = [];
  constructor(private db: AngularFireDatabase) {
    this.dishes = db.list("/dishes").valueChanges()
  }

  getDishes(): Observable<Dish[]> {
    return this.dishes;
  }

  getSingleDish(key: string): Observable<any> {
    return this.db.object("/dishes/" + key).valueChanges()
  }

  filterDishesByPrice(
    from: number,
    to: number,
    kitchenTypesChoosen: string[],
    categoriesChoosen: string[],
    minStars: number,
    dishes: Dish[]
  ) {
    let found = dishes.filter((dish: Dish) => {
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
    let avgDishStars: number[] = [];
    for (let dish of dishes) {
      if (dish.rates) {
        if (dish.rates.length != 0) {
          let sum = 0;
          for (let rate of dish.rates) sum += rate.rate;
          avgDishStars.push(sum / dish.rates.length);
        } else {
          avgDishStars.push(5);
        }
      } else {
        avgDishStars.push(4.5);
      }
    }
    found = found.filter((dish: Dish, i: number) => {
      return avgDishStars[i] >= minStars;
    });
    console.log(found)
    let obj = {
      dish: found,
      action: 'filtered',
    };
    this.subject.next(obj);
    return obj;
  }

  addDish(data: any): void {
    const dishId = this.db.createPushId()
    let urls = data.url.split(',');
    let newDish = {
      _id: dishId,
      name: data.name,
      kitchenType: data.kitchenType,
      category: data.category,
      products: data.products,
      available: data.available,
      priceUSD: data.priceUSD,
      description: data.description,
      url: urls,
      avgStars: 5,
      rates: [],
      comments: [],
    };
    this.db.list("/dishes").set(dishId, newDish)
  }

  getMsg(): any {
    return this.subject.asObservable();
  }

  changeCurrency(currency: string): void {
    this.currency = currency;
    if (currency == '$') this.rate = 1;
    else this.rate = 0.8861;
  }

  removeDish(id: string) {
    this.db.object("/dishes/" + id).remove()
  }

  editDish(id: string, data: any): Promise<any> {
    let urls = data.url.split(',');
    let editedDish = {
      _id: id,
      name: data.name,
      kitchenType: data.kitchenType,
      category: data.category,
      products: data.products,
      available: data.available,
      priceUSD: data.priceUSD,
      description: data.description,
      url: urls,
      avgStars: 5,
    };
    return this.db.object("/dishes/" + id).update(editedDish)
  }

  rateDish(
    dishID: string | null,
    userID: string,
    rate: number,
    allRates: any
  ) {
    let databaseRate = {
      id: userID,
      rate: rate
    }
    if (allRates) {
      let index = allRates.findIndex((element: any) => element.id == userID)
      if (index != -1) {
        this.db.list("/dishes/" + dishID + "/rates").set(index.toString(), databaseRate)
      }
      else {
        this.db.list("/dishes/" + dishID + "/rates").set(allRates.length.toString(), databaseRate)
      }
    } else {
      this.db.list("/dishes/" + dishID + "/rates").set("0", databaseRate)
    }
  }

  commentDish(
    dishID: string | null,
    userID: string,
    comment: Commentary
  ) {
    let commentData = {
      id: userID,
      comment: comment
    }
    this.db.list("/dishes/" + dishID + "/comments").push(commentData)
  }
}
