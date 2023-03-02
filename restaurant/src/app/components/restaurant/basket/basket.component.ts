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
  userID: string = ""

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
    this.userService.checkAuth().subscribe((user: any) => {
      if (user)
        this.userID = user.uid
      else
        this.userID = ""
    })
    this.dishesService.getDishes().subscribe((data: Dish[]) => {
      this.dishes = data;
      this.refreshBasket();
    });
    this.basketService.getMsg().subscribe((data: any) => {
      this.refreshBasket();
      if (data.action == 'add' || data.action == 'delete') {
        let serverBasket = [...this.basketDishes];
        for (const basketDish of serverBasket) {
          basketDish.dish.rates = [];
          basketDish.dish.comments = [];
        }
        if (this.userID != "")
          this.userService.updateBasket(serverBasket, this.userID)
      }
      else if (data == "BASKET_CLEARED") {
        if (this.userID != "")
          this.userService.updateBasket([], this.userID)
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
  }

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
  }
}
