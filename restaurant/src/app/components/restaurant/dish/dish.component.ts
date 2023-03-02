import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DishesService } from 'src/app/services/dishes.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { UserService } from 'src/app/services/user.service';
import { Commentary } from 'src/models/commentary';
import { Dish } from 'src/models/dish';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css'],
})
export class DishComponent implements OnInit {
  dish: any | null = null;
  currency: string;
  rate: number;
  starsGiven: number = 0;
  stars: string[] = [
    'emptyStar.png',
    'emptyStar.png',
    'emptyStar.png',
    'emptyStar.png',
    'emptyStar.png',
  ];
  comments: Commentary[] = [];
  errors: string[] = [];
  role: string = '';
  bought: boolean = false;
  active: boolean = false;
  user: any;
  avgStars: number = 4.5;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dishesService: DishesService,
    private restaurantService: RestaurantService,
    private userService: UserService
  ) {
    this.currency = this.restaurantService.getCurrency();
    this.rate = this.restaurantService.getRate();
    this.role = ""
    this.bought = false
    this.active = false
  }

  ngOnInit(): void {
    this.restaurantService.getMsg().subscribe((data: any) => {
      if (data.action == 'currencyChanged') {
        this.currency = data.currency;
        this.rate = data.rate;
      }
    });
    this.userService.checkAuth().subscribe((data: any) => {
      if (data != null) {
        this.userService.getUserFromDatabase(data.uid).subscribe((user: any) => {
          this.user = user;
          this.role = user.role;
          this.active = user.activeAccount;
          if (this.user.purchaseHistory) {
            if (this.dish)
              this.refresh()
          }
          else
            this.bought = false
        })
      }
    });
    let id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.dishesService.getSingleDish(id).subscribe((data: any) => {
        if (data != undefined) {
          this.dish = data
          if (this.dish.comments)
            this.comments = Object.values(this.dish.comments).map((info: any) => info.comment);
          if (this.dish.rates) {
            this.calculateAvgStars(this.dish);
            if (this.user)
              this.refresh()
          }
        } else {
          this.router.navigate(['/dishes']);
        }
      });
    } else {
      this.router.navigate(['/dishes']);
    }
  }

  refresh() {
    if(this.dish.rates){
      let index = this.dish.rates.findIndex(
        (rate: any) => rate._id == this.user.id
      );
      if (index != -1) {
        let starIndex = this.dish.rates[index].rate;
        for (let i = 0; i < this.stars.length; i++) {
          if (i < starIndex) this.stars[i] = 'star.png';
          else this.stars[i] = 'emptyStar.png';
        }
        this.starsGiven = starIndex;
      }
    }

    if (this.user.purchaseHistory) {
      let history: any = Object.values(this.user.purchaseHistory)[0]
      let index = history.findIndex((e: any) => e._id == this.dish._id)
      if (index != -1)
        this.bought = true
      else
        this.bought = false
    }
    else
      this.bought = false
  }

  setStars(starIndex: number): void {
    starIndex++;
    for (let i = 0; i < this.stars.length; i++) {
      if (i < starIndex) this.stars[i] = 'star.png';
      else this.stars[i] = 'emptyStar.png';
    }
    this.starsGiven = starIndex;
    this.dishesService
      .rateDish(
        this.route.snapshot.paramMap.get('id'),
        this.user._id,
        starIndex,
        this.dish.rates
      )
  }

  calculateAvgStars(dish: Dish) {
    if (dish.rates.length != 0) {
      let sum = 0;
      let total = 0
      for (let rate of dish.rates) {
        if (rate) {
          sum += rate.rate;
          total++
        }
      }
      this.avgStars = sum / total;
    } else this.avgStars = -1;
  }

  addComment(comment: Commentary): void {
    this.dishesService
      .commentDish(
        this.route.snapshot.paramMap.get('id'),
        this.user._id,
        comment
      )
  }

  updateCommentErrors(errors: string[]): void {
    this.errors = errors;
  }
}
