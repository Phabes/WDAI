import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DishesService } from 'src/app/services/dishes.service';
import { BasketService } from 'src/app/services/basket.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { Dish } from 'src/models/dish';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-single-dish',
  templateUrl: './single-dish.component.html',
  styleUrls: ['./single-dish.component.css'],
})
export class SingleDishComponent implements OnInit {
  @Input() dish!: Dish;
  @Input() dishInfo: any = {};
  starsGiven: number = 0;
  stars: string[] = [
    'emptyStar.png',
    'emptyStar.png',
    'emptyStar.png',
    'emptyStar.png',
    'emptyStar.png',
  ];
  currency: string;
  rate: number;
  user: any = null;

  constructor(
    private dishesService: DishesService,
    private basketService: BasketService,
    private restaurantService: RestaurantService,
    private userService: UserService
  ) {
    this.currency = restaurantService.getCurrency();
    this.rate = restaurantService.getRate();
  }

  ngOnInit(): void {
    this.restaurantService.getMsg().subscribe((data: any) => {
      if (data.action == 'currencyChanged') {
        this.currency = data.currency;
        this.rate = data.rate;
      }
    });
    this.userService.checkAuth().subscribe((data: any) => {
      if (data.action == 'VERIFIED') {
        this.user = data.user;
      }
    });
  }

  addButtonClick(): void {
    this.basketService.addDish(this.dish);
  }

  removeButtonClick(): void {
    this.basketService.deleteDish(this.dish);
  }

  removeDishButtonClick(): void {
    this.basketService.removeDish(this.dish);
    this.dishesService.removeDish(this.dish._id);
  }

  setStars(starIndex: number): void {
    starIndex++;
    if (starIndex == this.starsGiven) {
      for (let i = 0; i < this.stars.length; i++) {
        this.stars[i] = 'emptyStar.png';
      }
      this.starsGiven = 0;
    } else {
      for (let i = 0; i < this.stars.length; i++) {
        if (i < starIndex) this.stars[i] = 'star.png';
        else this.stars[i] = 'emptyStar.png';
      }
      this.starsGiven = starIndex;
    }
  }

  getBorder(isExpensive: boolean, isCheap: boolean): string {
    if (isExpensive) {
      return '2px solid green';
    }
    if (isCheap) {
      return '2px solid red';
    }
    return 'none';
  }
}
