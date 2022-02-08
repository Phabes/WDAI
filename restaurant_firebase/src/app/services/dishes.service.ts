import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { MockData } from "src/mock-data/mock-dish-data";
import { Dish } from "../../models/dish";
import { AngularFireDatabase } from "@angular/fire/database";
// import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class DishesService {
  dishes: Observable<Dish[]>;
  subject = new Subject();
  // dishes: Dish[] = [];
  lastID: number = 0;
  currency: string = "$";
  rate: number = 1;
  last: Dish[] = [];
  constructor(
    // private store: AngularFirestore,
    private db: AngularFireDatabase
  ) {
    this.dishes = this.db
      .list("restaurant")
      .snapshotChanges()
      .pipe(
        map((products: any[]) =>
          products.map((prod) => {
            const payload = prod.payload.val() as Dish;
            const key = prod.key;
            return <any>{ key, ...payload };
          })
        )
      );
    // this.dishes = MockData.Dishes;
    // for (const dish of this.dishes) {
    //   if (dish.dishID > this.lastID) this.lastID = dish.dishID;
    // }
  }

  // getDishes(): Dish[] {
  //   return this.dishes;
  // }

  getDishes(): Observable<Dish[]> {
    return this.dishes;
  }

  // getSingleDish(index: number): Dish {
  //   return this.dishes[index];
  // }

  getSingleDish(key: string): Observable<unknown> {
    // let result = this.db.doc("students/" + key);
    // return result.valueChanges();
    return this.db.object(`restaurant/${key}`).valueChanges();
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
      action: "filtered",
    };
    this.subject.next(obj);
    return obj;
  }

  getLastID(): number {
    return this.lastID;
  }

  // addDish(data: any) {
  //   this.dishes.push({
  //     dishID: this.getLastID() + 1,
  //     name: data.name,
  //     kitchenType: data.kitchenType,
  //     category: data.category,
  //     products: data.products,
  //     available: data.available,
  //     priceUSD: data.priceUSD,
  //     description: data.description,
  //     url: data.url,
  //     avgStars: 5,
  //   });
  //   this.sendMsg(this.dishes[this.dishes.length - 1]);
  // }

  addDish(data: any) {
    let urls = data.url.split(",");
    let newDish: Dish = {
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
    // this.dishes.push({
    //   dishID: this.getLastID() + 1,
    //   name: data.name,
    //   kitchenType: data.kitchenType,
    //   category: data.category,
    //   products: data.products,
    //   available: data.available,
    //   priceUSD: data.priceUSD,
    //   description: data.description,
    //   url: data.url,
    //   avgStars: 5,
    // });
    // this.sendMsg(this.dishes[this.dishes.length - 1]);
    let newPostKey = this.db.database.ref().child("restaurant").push().key;
    const newData = this.db.object(`restaurant/${newPostKey}`);
    newData.set(newDish);
  }

  getMsg(): any {
    return this.subject.asObservable();
  }

  sendMsg(dish: any): void {
    let obj = {
      dish: dish,
      action: "added",
    };
    this.subject.next(obj);
  }

  sendMsg2(dish: any): void {
    let obj = {
      dish: dish,
      action: "filtered",
    };
    this.subject.next(obj);
  }

  changeCurrency(currency: string): void {
    this.currency = currency;
    if (currency == "$") {
      this.rate = 1;
    } else {
      this.rate = 0.8861;
    }
  }

  // sendMsg4(dish: Dish) {
  //   let obj = {
  //     dish: dish,
  //     action: "removed",
  //   };
  //   this.subject.next(obj);
  // }

  removeDish(key: string) {
    const newData = this.db.object(`restaurant/${key}`);
    newData.remove();
  }
}
