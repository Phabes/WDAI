import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BasketService } from 'src/app/services/basket.service';
import { DishesService } from 'src/app/services/dishes.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { Dish } from '../../../../models/dish';

@Component({
  selector: 'app-filter-dishes',
  templateUrl: './filter-dishes.component.html',
  styleUrls: ['./filter-dishes.component.css'],
})
export class FilterDishesComponent implements OnInit {
  // @Output() filterDishes = new EventEmitter<Dish[]>();
  dishes: Dish[] = [];
  kitchenTypes: string[] = [];
  kitchenTypesChoosen: string[] = [];
  categories: string[] = [];
  categoriesChoosen: string[] = [];
  stars: number[] = [1, 2, 3, 4, 5];
  // starsChoosen: number[] = [];
  minStars: number = 1;
  miniPrice: number = 0;
  maxiPrice: number = 0;
  fromPrice: number = 0;
  toPrice: number = 0;
  currency: string;
  rate: number;

  constructor(
    private dishesService: DishesService,
    private basketService: BasketService,
    private restaurantService: RestaurantService
  ) {
    this.currency = restaurantService.getCurrency();
    this.rate = restaurantService.getRate();
  }

  ngOnInit(): void {
    this.setData();
    for (const type of this.kitchenTypes) {
      this.kitchenTypesChoosen.push(type);
    }
    for (const category of this.categories) {
      this.categoriesChoosen.push(category);
    }
    // for (const star of this.stars) {
    //   this.starsChoosen.push(star);
    // }
    this.dishesService.getMsg().subscribe((data: any) => {
      if (data.action == 'added') {
        this.setData();
        if (!this.categoriesChoosen.includes(data.dish.category))
          this.categoriesChoosen.push(data.dish.category);
        if (!this.kitchenTypesChoosen.includes(data.dish.category))
          this.kitchenTypesChoosen.push(data.dish.kitchenType);
      }
      if (data.action == 'removed') {
        this.setData();
      }
    });
    this.basketService.getMsg().subscribe((data: any) => {
      if (data.action == 'removeFromBasket') {
        this.setData();
      }
    });
    this.restaurantService.getMsg().subscribe((data: any) => {
      if (data.action == 'currencyChanged') {
        this.currency = data.currency;
        this.rate = data.rate;
        this.setData();
      }
    });
  }

  setData(): void {
    this.dishes = this.dishesService.getDishes();
    this.kitchenTypes = [];
    for (const dish of this.dishes) {
      if (!this.kitchenTypes.includes(dish.kitchenType)) {
        this.kitchenTypes.push(dish.kitchenType);
      }
    }
    this.categories = [];
    for (const dish of this.dishes) {
      if (!this.categories.includes(dish.category)) {
        this.categories.push(dish.category);
      }
    }
    if (this.dishes.length > 0) {
      this.maxiPrice =
        Math.round(this.findHighestPrice() * this.rate * 100) / 100;
      this.miniPrice =
        Math.round(this.findLowestPrice() * this.rate * 100) / 100;
      this.fromPrice = this.miniPrice;
      this.toPrice = this.maxiPrice;
    } else {
      this.maxiPrice = 0;
      this.miniPrice = 0;
      this.fromPrice = 0;
      this.toPrice = 0;
    }
  }

  findHighestPrice(): number {
    return this.dishes.reduce(function (prev, curr) {
      return prev.priceUSD > curr.priceUSD ? prev : curr;
    }).priceUSD;
  }

  findLowestPrice(): number {
    return this.dishes.reduce(function (prev, curr) {
      return prev.priceUSD < curr.priceUSD ? prev : curr;
    }).priceUSD;
  }

  filter(): void {
    console.log('FILTRUJ');
    // let minStars = Math.min.apply(null, this.starsChoosen);
    // let maxStars = Math.max.apply(null, this.starsChoosen);
    // console.log(minStars, maxStars);
    let foundDishes = this.dishesService.filterDishesByPrice(
      this.fromPrice,
      this.toPrice,
      this.kitchenTypesChoosen,
      this.categoriesChoosen,
      this.minStars
    );
  }

  miniChange(input: any): void {
    const val = input.target.value;
    if (val == '') this.fromPrice = this.miniPrice;
    else if (!isNaN(val)) {
      if (
        val >= this.miniPrice &&
        val <= this.maxiPrice &&
        val <= this.toPrice
      ) {
        this.fromPrice = val;
      } else if (val < this.miniPrice) this.fromPrice = this.miniPrice;
    } else this.fromPrice = this.miniPrice;
  }

  maxiChange(input: any): void {
    const val = input.target.value;
    if (val == '') this.toPrice = this.maxiPrice;
    else if (!isNaN(val)) {
      if (
        val >= this.miniPrice &&
        val <= this.maxiPrice &&
        val >= this.fromPrice
      ) {
        this.toPrice = val;
      } else if (val > this.maxiPrice) this.toPrice = this.maxiPrice;
    } else this.toPrice = this.maxiPrice;
  }

  typeChange(checkbox: any): void {
    if (checkbox.target.checked) {
      this.kitchenTypesChoosen.push(checkbox.target.name);
    } else {
      let index = this.kitchenTypesChoosen.indexOf(checkbox.target.name);
      if (index != -1) this.kitchenTypesChoosen.splice(index, 1);
    }
  }

  categoryChange(checkbox: any): void {
    if (checkbox.target.checked) {
      this.categoriesChoosen.push(checkbox.target.name);
    } else {
      let index = this.categoriesChoosen.indexOf(checkbox.target.name);
      if (index != -1) this.categoriesChoosen.splice(index, 1);
    }
  }

  starChange(select: any): void {
    // if (checkbox.target.checked) {
    //   this.starsChoosen.push(
    //     parseInt(checkbox.target.name[checkbox.target.name.length - 1])
    //   );
    // } else {
    //   let index = this.starsChoosen.indexOf(
    //     parseInt(checkbox.target.name[checkbox.target.name.length - 1])
    //   );
    //   this.starsChoosen.splice(index, 1);
    // }
    this.minStars = select.target.value;
  }
}
