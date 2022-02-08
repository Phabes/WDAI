import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css'],
})
export class DishesComponent implements OnInit {
  @Input() dishes: any[] = [];
  basket: any[] = [];
  total: number = 0;
  currency: number = 0; // 0 - $, 1 - €
  rate: number = 1;

  constructor() {}

  ngOnInit(): void {
    this.dishes.map(
      (e) => (
        (e.hide = false),
        (e.inBasket = 0),
        (e.color = 'none'),
        (e.priceSymbol = this.currency == 0 ? '$' : '€')
      )
    );
    let expensiveIndex = this.findMostExpensive();
    let cheapIndex = this.findCheapest();
    if (expensiveIndex != cheapIndex) {
      this.dishes[expensiveIndex].color = 'red';
      this.dishes[cheapIndex].color = 'green';
    }
  }

  findMostExpensive(): number {
    let index = 0;
    for (let i = 1; i < this.dishes.length; i++) {
      if (this.dishes[i].priceUSD > this.dishes[index].priceUSD) index = i;
    }
    return index;
  }

  findCheapest(): number {
    let index = 0;
    for (let i = 1; i < this.dishes.length; i++) {
      if (this.dishes[i].priceUSD < this.dishes[index].priceUSD) index = i;
    }
    return index;
  }

  addDish(dish: any): void {
    console.log(dish);
    if (this.basket.some((e) => e.index == dish)) {
      let i = this.basket.findIndex((e) => {
        return e.index == dish;
      });
      if (this.basket[i].amount < this.dishes[dish].available) {
        this.dishes[dish].inBasket++;
        this.basket[i].amount++;
        if (this.basket[i].amount == this.dishes[dish].available)
          this.dishes[dish].hide = true;
      }
    } else {
      if (0 < this.dishes[dish].available) {
        this.dishes[dish].inBasket = 1;
        let obj = {
          index: dish,
          amount: 1,
        };
        this.basket.push(obj);
      }
    }
    this.updateCart();
    console.log(this.basket);
  }

  removeDish(dish: any): void {
    console.log(dish);
    if (this.basket.some((e) => e.index == dish)) {
      let i = this.basket.findIndex((e) => {
        return e.index == dish;
      });
      this.dishes[dish].inBasket--;
      this.basket[i].amount--;
      if (this.basket[i].amount < this.dishes[dish].available)
        this.dishes[dish].hide = false;
      if (this.basket[i].amount == 0) {
        this.basket.splice(i, 1);
      }
    }
    this.updateCart();
    console.log(this.basket);
  }

  updateCart(): void {
    this.total = 0;
    for (const dish of this.basket) {
      this.total += dish.amount;
    }
  }

  changeCurrency(e: any): void {
    if (e.target.value == 'USD') {
      this.currency = 0;
      this.rate = 1;
      this.changeDishesCurrency('$');
    } else {
      this.currency = 1;
      this.rate = 0.8861;
      this.changeDishesCurrency('€');
    }
    console.log(this.rate);
  }

  changeDishesCurrency(symbol: string): void {
    for (const dish of this.dishes) {
      dish.priceSymbol = symbol;
    }
  }
}
