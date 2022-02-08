import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BasketService } from 'src/app/services/basket.service';
import { DishesService } from 'src/app/services/dishes.service';
import { Dish } from '../../../../models/dish';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css'],
})
export class DishesComponent implements OnInit {
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
        this.findCheapAndExpensive();
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
        this.sortBasket();
        this.findCheapAndExpensive();
      }
      if (data.action == 'filtered') {
        this.dishes = data.dish;
        this.sortBasket();
        // for (const dish of this.basketInfo) {
        //   let exist = false;
        //   for (const e of data.dish) {
        //     if (e.dishID == dish.dishID) {
        //       exist = true;
        //       break;
        //     }
        //   }
        //   dish.hideAll = !exist;
        // }
        this.findCheapAndExpensive();
      }
    });
  }

  sortBasket(): void {
    for (let i = 0; i < this.dishes.length; i++) {
      let index = null;
      for (let j = 0; j < this.basketInfo.length; j++) {
        if (this.dishes[i].dishID == this.basketInfo[j].dishID) {
          index = j;
          break;
        }
      }
      if (index != null) {
        let tmp = this.basketInfo[index];
        this.basketInfo[index] = this.basketInfo[i];
        this.basketInfo[i] = tmp;
      }
    }
  }

  findCheapAndExpensive(): void {
    for (let i = 0; i < this.basketInfo.length; i++) {
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
      }
    }
  }
}