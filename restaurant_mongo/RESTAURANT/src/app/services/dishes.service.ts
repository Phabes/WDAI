import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dish } from 'src/models/dish';
import { Commentary } from 'src/models/commentary';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root',
})
export class DishesService {
  dishes: Observable<Dish[]>;
  subject = new Subject();
  lastID: number = 0;
  currency: string = '$';
  rate: number = 1;
  last: Dish[] = [];
  constructor(private httpClient: HttpClient) {
    this.dishes = this.httpClient.get<Dish[]>(
      'http://localhost:5000/getDishes',
      httpOptions
    );
  }

  getDishes(): Observable<Dish[]> {
    return this.dishes;
  }

  getSingleDish(key: string): Observable<Dish> {
    // console.log(this.dishes);
    return this.httpClient.get<Dish>(
      `http://localhost:5000/getDish/${key}`,
      httpOptions
    );
  }

  filterDishesByPrice(
    from: number,
    to: number,
    kitchenTypesChoosen: string[],
    categoriesChoosen: string[],
    minStars: number,
    dishes: Dish[]
  ) {
    let avgDishStars: any[] = [];
    for (let dish of dishes) {
      if (dish.rates.length != 0) {
        let sum = 0;
        for (let rate of dish.rates) sum += rate.rate;
        avgDishStars.push(sum / dish.rates.length);
      } else {
        avgDishStars.push(5);
      }
    }
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
    found = found.filter((dish: Dish, i: number) => {
      return avgDishStars[i] >= minStars;
    });
    let obj = {
      dish: found,
      action: 'filtered',
    };
    this.subject.next(obj);
    return obj;
  }

  addDish(data: any): void {
    let urls = data.url.split(',');
    let newDish = {
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
    this.httpClient
      .post(`http://localhost:5000/addDish`, { newDish: newDish }, httpOptions)
      .toPromise()
      .then((data: any) => {
        console.log(data);
        this.subject.next({ action: 'DISH_ADDED', dish: data.dish });
      }); // zamiast console.log później można zwrócić obiekt i na jego podstawie coś robić
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
    this.httpClient
      .delete(`http://localhost:5000/removeDish/${id}`, httpOptions)
      .toPromise()
      .then((data: any) => {
        this.subject.next({ action: 'DISH_DELETED', id: id });
      }); // zamiast console.log później można zwrócić obiekt i na jego podstawie coś robić
  }

  // editDish(id: string, data: any): Observable<any> {
  editDish(id: string, data: any) {
    let urls = data.url.split(',');
    let editedDish = {
      // _id: id,
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
    // console.log(JSON.stringify(editedDish));
    return this.httpClient.post(
      `http://localhost:5000/updateDish/${id}`,
      { dish: editedDish },
      httpOptions
    );
  }

  rateDish(
    dishID: string | null,
    userID: string,
    rate: number
  ): Observable<any> {
    return this.httpClient.post(
      `http://localhost:5000/rateDish/${dishID}`,
      { rate: rate, userID: userID },
      httpOptions
    );
  }

  commentDish(
    dishID: string | null,
    userID: string,
    comment: Commentary
  ): Observable<any> {
    return this.httpClient.post(
      `http://localhost:5000/commentDish/${dishID}`,
      { comment: comment, userID: userID },
      httpOptions
    );
  }
}
