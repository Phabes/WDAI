import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BasketService } from 'src/app/services/basket.service';
import { DishesService } from 'src/app/services/dishes.service';
import { Dish } from '../../../../models/dish';

// interface Dish2 extends Dish {
//   inBasket: number;
//   hide: boolean;
//   color: string;
//   priceSymbol: string;
// }

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css'],
})
export class DishesComponent implements OnInit {
  // @Input() dishes: Dish[] = [];
  // @Input() rate: number = 1;
  // @Output() addToBasketClick = new EventEmitter<number>();
  // @Output() removeFromBasketClick = new EventEmitter<number>();
  // @Output() removeDishClick = new EventEmitter<number>();
  dishes: Dish[] = [];
  total: number = 0;
  basketInfo: any[] = [];

  constructor(
    private basketService: BasketService,
    private dishesService: DishesService
  ) {
    this.dishes = this.dishesService.getDishes();
    for (const dish of this.dishes) {
      this.basketInfo.push({
        dishID: dish.dishID,
        quantity: 0,
        hide: false,
        hideAll: false,
        expensive: false,
        cheap: false,
      });
    }
    this.findCheapAndExpensive();
  }

  ngOnInit(): void {
    this.basketService.getMsg().subscribe((data: any) => {
      if (data.action == 'add') {
        this.changeView(data);
      } else if (data.action == 'delete') {
        this.changeView(data);
      } else if (data.action == 'removeFromBasket') {
        this.changeView(data);
      }
    });
    this.dishesService.getMsg().subscribe((data: any) => {
      if (data.action == 'added') {
        this.basketInfo.push({
          dishID: data.dish.dishID,
          quantity: 0,
          hide: false,
          hideAll: false,
          expensive: false,
          cheap: false,
        });
        this.findCheapAndExpensive();
      }
      if (data.action == 'filtered') {
        for (const dish of this.basketInfo) {
          let exist = false;
          for (const e of data.dish) {
            if (e.dishID == dish.dishID) {
              exist = true;
              break;
            }
          }
          dish.hideAll = !exist;
        }
        this.findCheapAndExpensive();
      }
    });
  }

  findCheapAndExpensive(): void {
    for (let i = 0; i < this.basketInfo.length; i++) {
      // for (const dish of this.basketInfo) {
      this.basketInfo[i].expensive = false;
      this.basketInfo[i].cheap = false;
    }
    let cheap = null;
    let expensive = null;
    for (let i = 0; i < this.dishes.length; i++) {
      if (!this.basketInfo[i].hideAll) {
        if (expensive == null) expensive = i;
        if (this.dishes[i].priceUSD > this.dishes[expensive].priceUSD) {
          expensive = i;
        }
        if (cheap == null) cheap = i;
        if (this.dishes[i].priceUSD < this.dishes[cheap].priceUSD) {
          cheap = i;
        }
      }
    }
    if (cheap != null && expensive != null && expensive != cheap) {
      this.basketInfo[expensive].expensive = true;
      this.basketInfo[cheap].cheap = true;
    }
  }

  changeView(data: any): void {
    let index = null;
    for (let i = 0; i < this.dishes.length; i++) {
      if (this.dishes[i].dishID == data.dish.dishID) {
        index = i;
        break;
      }
    }
    if (index != null) {
      if (data.action == 'add') {
        if (this.basketInfo[index].quantity < this.dishes[index].available) {
          this.basketInfo[index].quantity++;
          if (this.basketInfo[index].quantity == this.dishes[index].available)
            this.basketInfo[index].hide = true;
        }
      } else if (data.action == 'delete') {
        if (this.basketInfo[index].quantity > 0) {
          this.basketInfo[index].quantity--;
          if (this.basketInfo[index].quantity != this.dishes[index].available)
            this.basketInfo[index].hide = false;
        }
      } else if (data.action == 'removeFromBasket') {
        this.basketInfo.splice(index, 1);
        this.dishes.splice(index, 1);
        // this.dishesService.removeDish(index);
      }
    }
  }

  addToBasket(dishIndex: number): void {
    // this.addToBasketClick.emit(dishIndex);
  }

  removeFromBasket(dishIndex: number): void {
    // this.removeFromBasketClick.emit(dishIndex);
  }

  removeDish(dishIndex: number): void {
    // this.dishes.splice(dishIndex, 1);
    // this.removeDishClick.emit(dishIndex);
  }
}
