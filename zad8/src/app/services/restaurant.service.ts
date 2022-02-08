import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  subject = new Subject();
  currency: string = '$';
  rate: number = 1;

  constructor() {}

  getCurrency() {
    return this.currency;
  }

  getRate() {
    return this.rate;
  }

  sendMsg(currency: string): void {
    this.currency = currency;
    let rate = 0.8861;
    this.rate = 0.8861;
    if (currency == '$') {
      rate = 1;
      this.rate = 1;
    }
    let obj = {
      currency: currency,
      rate: rate,
      action: 'currencyChanged',
    };
    this.subject.next(obj);
  }

  getMsg(): any {
    return this.subject.asObservable();
  }
}
