import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/services/basket.service';
import { DishesService } from 'src/app/services/dishes.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { UserService } from 'src/app/services/user.service';
import { BasketDish } from 'src/models/basketDish';
import { Dish } from 'src/models/dish';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent implements OnInit {
  dishes: Dish[] = [];
  basketDishes: BasketDish[] = [];
  sumPrice: number = 0;
  totalDishes: number = 0;
  currency: string;
  rate: number;

  constructor(
    private basketService: BasketService,
    private dishesService: DishesService,
    private restaurantService: RestaurantService,
    private userService: UserService
  ) {
    this.currency = restaurantService.getCurrency();
    this.rate = restaurantService.getRate();
  }

  ngOnInit(): void {
    this.dishesService.getDishes().subscribe((data: Dish[]) => {
      this.dishes = data;
      this.refreshBasket();
    });
    this.basketService.getMsg().subscribe((data: any) => {
      this.refreshBasket();
      if (data.action == 'add' || data.action == 'delete') {
        // console.log(this.basketDishes);
        let serverBasket = [...this.basketDishes];
        for (const basketDish of serverBasket) {
          basketDish.dish.rates = [];
          basketDish.dish.comments = [];
        }
        // let serverBasket = this.basketDishes.map((e: any) => {
        //   return {
        //     _id: e.dish._id,
        //     quantity: e.quantity,
        //   };
        // });
        this.userService.updateBasket(serverBasket).subscribe((data2: any) => {
          // console.log(data2);
        });
      }
    });
    this.dishesService.getMsg().subscribe((data: any) => {
      this.refreshBasket();
    });
    this.restaurantService.getMsg().subscribe((data: any) => {
      if (data.action == 'currencyChanged') {
        this.currency = data.currency;
        this.rate = data.rate;
        this.refreshBasket();
      }
    });
    this.userService.getUser().subscribe((data: any) => {
      // console.log(data);
      this.basketService.clearBasket();
      // setTimeout(() => {
      //   this.userService.getBasket().subscribe((data2: any) => {
      //     console.log(data2);
      //   });
      // }, 1000);
    });
  }

  // addDishToBasket(dish: Dish): void {
  //   let index = null;
  //   for (let i = 0; i < this.basketItems.length; i++) {
  //     if (this.basketItems[i].dishID == dish.dishID) {
  //       index = i;
  //       break;
  //     }
  //   }
  //   if (index != null) {
  //     let add = false;
  //     for (const e of this.dishes) {
  //       if (
  //         e.dishID == dish.dishID &&
  //         e.available > this.basketItems[index].quantity
  //       ) {
  //         add = true;
  //         break;
  //       }
  //     }
  //     if (add) this.basketItems[index].quantity++;
  //   } else {
  //     this.basketItems.push({
  //       dishID: dish.dishID,
  //       quantity: 1,
  //       price: dish.priceUSD,
  //     });
  //   }
  //   this.refreshBasket();
  // }

  // removeDishFromBasket(dish: Dish): void {
  //   let index = null;
  //   for (let i = 0; i < this.basketItems.length; i++) {
  //     if (this.basketItems[i].dishID == dish.dishID) {
  //       index = i;
  //       break;
  //     }
  //   }
  //   if (index != null) {
  //     this.basketItems[index].quantity--;
  //     if (this.basketItems[index].quantity == 0) {
  //       this.basketItems.splice(index, 1);
  //     }
  //   }
  //   this.refreshBasket();
  // }

  // deleteDishFromBasket(dish: Dish): void {
  //   let index = null;
  //   for (let i = 0; i < this.basketItems.length; i++) {
  //     if (this.basketItems[i].dishID == dish.dishID) {
  //       index = i;
  //       break;
  //     }
  //   }
  //   if (index != null) {
  //     this.basketItems.splice(index, 1);
  //   }
  //   index = null;
  //   for (let i = 0; i < this.dishes.length; i++) {
  //     if (this.dishes[i].dishID == dish.dishID) {
  //       index = i;
  //       break;
  //     }
  //   }
  //   if (index != null) {
  //     this.dishes.splice(index, 1);
  //   }
  //   this.refreshBasket();
  // }

  refreshBasket(): void {
    this.basketDishes = this.basketService.getBasket();
    this.sumPrice = 0;
    this.totalDishes = 0;
    for (const basketDish of this.basketDishes) {
      this.sumPrice +=
        (Math.round(basketDish.dish.priceUSD * this.rate * 100) / 100) *
        basketDish.quantity;
      this.totalDishes += basketDish.quantity;
    }
    // console.log(this.basketDishes);
    // for (const dish of this.basketItems) {
    //   this.sumPrice +=
    //     (Math.round(dish.price * this.rate * 100) / 100) * dish.quantity;
    //   this.totalDishes += dish.quantity;
    // }
  }
}
