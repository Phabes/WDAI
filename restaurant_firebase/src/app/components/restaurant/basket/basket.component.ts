import { Component, Input, OnChanges, OnInit } from "@angular/core";
// import { DishesService } from 'src/app/dishes.service';
import { BasketService } from "src/app/services/basket.service";
import { DishesService } from "src/app/services/dishes.service";
import { RestaurantService } from "src/app/services/restaurant.service";
import { BasketDish } from "src/models/basketDish";
import { Dish } from "src/models/dish";

// interface Dish2 extends Dish {
//   inBasket: number;
//   hide: boolean;
//   color: string;
//   priceSymbol: string;
// }

@Component({
  selector: "app-basket",
  templateUrl: "./basket.component.html",
  styleUrls: ["./basket.component.css"],
})
export class BasketComponent implements OnInit {
  dishes: Dish[] = [];
  basketDishes: BasketDish[] = [];
  basketItems: any = [];
  sumPrice: number = 0;
  totalDishes: number = 0;
  currency: string;
  rate: number;

  constructor(
    private basketService: BasketService,
    private dishesService: DishesService,
    private restaurantService: RestaurantService
  ) {
    this.currency = restaurantService.getCurrency();
    this.rate = restaurantService.getRate();
  }

  ngOnInit(): void {
    // this.dishes = this.dishesService.getDishes();
    this.dishesService.getDishes().subscribe((data: Dish[]) => {
      this.dishes = data;
      this.refreshBasket();
    });
    this.basketService.getMsg().subscribe((data: any) => {
      this.refreshBasket();
    });
    this.dishesService.getMsg().subscribe((data: any) => {
      this.refreshBasket();
    });
    this.restaurantService.getMsg().subscribe((data: any) => {
      if (data.action == "currencyChanged") {
        this.currency = data.currency;
        this.rate = data.rate;
        this.refreshBasket();
      }
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
    // for (const dish of this.basketItems) {
    //   this.sumPrice +=
    //     (Math.round(dish.price * this.rate * 100) / 100) * dish.quantity;
    //   this.totalDishes += dish.quantity;
    // }
  }
}
