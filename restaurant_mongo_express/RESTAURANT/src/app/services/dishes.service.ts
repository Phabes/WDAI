import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dish } from 'src/models/dish';

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
      'http://127.0.0.1:5000/getDishes'
    );
  }

  getDishes(): Observable<Dish[]> {
    return this.dishes;
  }

  getSingleDish(key: string): Observable<Dish[]> {
    return this.httpClient.get<Dish[]>(`http://127.0.0.1:5000/getDish/${key}`);
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
    };
    this.httpClient
      .post(`http://127.0.0.1:5000/addDish`, { newDish: newDish })
      .toPromise()
      .then((data) => console.log(data)); // zamiast console.log później można zwrócić obiekt i na jego podstawie coś robić
  }

  getMsg(): any {
    return this.subject.asObservable();
  }

  changeCurrency(currency: string): void {
    this.currency = currency;
    if (currency == '$') this.rate = 1;
    else this.rate = 0.8861;
  }

  removeDish(key: string) {
    this.httpClient
      .delete(`http://127.0.0.1:5000/removeDish/${key}`)
      .toPromise()
      .then((data) => console.log(data)); // zamiast console.log później można zwrócić obiekt i na jego podstawie coś robić
  }
}
