import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BasketService } from 'src/app/services/basket.service';
import { DishesService } from 'src/app/services/dishes.service';
import { PersistenceService } from 'src/app/services/persistence.service';
import { UserService } from 'src/app/services/user.service';
import { Dish } from 'src/models/dish';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css'],
})
export class DishesComponent implements OnInit {
  dishes: Dish[] = [];
  total: number = 0;
  basketInfo: any[] = [];
  itemsPerPage: number = 6;
  page: number = 1;
  maximumItemsPerPage: number[] = Array.from(Array(10).keys())
    .map((x) => {
      return x + 1;
    })
    .filter((x) => {
      return x >= 6;
    });

  constructor(
    private basketService: BasketService,
    private dishesService: DishesService //private persistenceService: PersistenceService // private userService: UserService, // private router: Router
  ) {
    // this.dishes = this.dishesService.getDishes();
    // let basket = this.basketService.getBasket();
    // for (const dish of this.dishes) {
    //   let amount = 0;
    //   for (const basketDish of basket) {
    //     if (basketDish.dish.dishID == dish.dishID) {
    //       amount = basketDish.quantity;
    //       break;
    //     }
    //   }
    //   this.basketInfo.push({
    //     dishID: dish.dishID,
    //     quantity: amount,
    //     hide: false,
    //     hideAll: false,
    //     expensive: false,
    //     cheap: false,
    //   });
    // }
    // this.findCheapAndExpensive();
    this.dishesService.getDishes().subscribe((data: Dish[]) => {
      this.dishes = data;
      let basket = this.basketService.getBasket();
      for (const dish of this.dishes) {
        let amount = 0;
        for (const basketDish of basket) {
          if (basketDish.dish._id == dish._id) {
            amount = basketDish.quantity;
            break;
          }
        }
        this.basketInfo.push({
          _id: dish._id,
          quantity: amount,
          hide: false,
          hideAll: false,
          expensive: false,
          cheap: false,
        });
      }
      this.findCheapAndExpensive();
    });
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
        if (Math.floor(this.dishes.length / this.itemsPerPage) < this.page) {
          let index = this.findLastValidPage();
          this.changePage(index);
        }
      }
    });
    this.dishesService.getMsg().subscribe((data: any) => {
      if (data.action == 'filtered') {
        if (data.dish.length > 0) {
          this.dishes = data.dish;
          if (this.dishes.length > this.basketInfo.length) {
            let amount = this.dishes.length - this.basketInfo.length;
            for (let i = 0; i < amount; i++) {
              this.basketInfo.push({
                dishID: data.dish[i].dishID,
                _id: data.dish[i]._id,
                quantity: amount,
                hide: false,
                hideAll: false,
                expensive: false,
                cheap: false,
              });
            }
          }
          if (Math.floor(this.dishes.length / this.itemsPerPage) < this.page) {
            let index = this.findLastValidPage();
            this.changePage(index);
          }
          this.sortBasket();
          this.findCheapAndExpensive();
        }
      }
    });
  }

  sortBasket(): void {
    for (let i = 0; i < this.dishes.length; i++) {
      let index = null;
      for (let j = 0; j < this.basketInfo.length; j++) {
        if (this.dishes[i]._id == this.basketInfo[j]._id) {
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
        if (this.dishes[i].priceUSD > this.dishes[expensive].priceUSD)
          expensive = i;
        if (cheap == null) cheap = i;
        if (this.dishes[i].priceUSD < this.dishes[cheap].priceUSD) cheap = i;
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
      if (this.dishes[i]._id == data.dish._id) {
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

  findLastValidPage(): number {
    if (this.dishes.length % this.itemsPerPage == 0)
      return Math.floor(this.dishes.length / this.itemsPerPage);
    return Math.floor(this.dishes.length / this.itemsPerPage) + 1;
  }

  changePage(index: number): void {
    this.page = index;
  }

  changeDishesPerPage(numberOfItems: any) {
    this.itemsPerPage = numberOfItems.target.value;
    this.changePage(this.findLastValidPage());
  }
}
