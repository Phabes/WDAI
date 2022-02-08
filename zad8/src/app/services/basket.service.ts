import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  subject = new Subject();

  constructor() {}

  sendMsg(dish: any): void {
    let obj = {
      dish: dish,
      action: 'add',
    };
    this.subject.next(obj);
  }

  sendMsg2(dish: any): void {
    let obj = {
      dish: dish,
      action: 'delete',
    };
    this.subject.next(obj);
  }

  sendMsg3(dish: any): void {
    let obj = {
      dish: dish,
      action: 'removeFromBasket',
    };
    this.subject.next(obj);
  }

  getMsg(): any {
    return this.subject.asObservable();
  }
}
