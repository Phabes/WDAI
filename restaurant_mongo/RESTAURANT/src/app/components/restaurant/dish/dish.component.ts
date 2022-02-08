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
    // this.comments.push({
    //   nick: 'NICK',
    //   title: 'Fajny Tytuł',
    //   review: 'Obszerny komentarz',
    // });
    // this.comments.push({
    //   nick: 'NICK',
    //   title: 'Fajny Tytuł',
    //   review: 'Obszerny komentarz',
    // });
    this.currency = this.restaurantService.getCurrency();
    this.rate = this.restaurantService.getRate();
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
        this.role = data.user.role;
        this.active = data.user.activeAccount;
      }
    });
    let id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.userService.checkIfBought(id).subscribe((data: any) => {
        if (data.action == 'VERIFIED') {
          this.bought = data.bought;
        }
      });
      this.dishesService.getSingleDish(id).subscribe((data: any) => {
        if (data.action == 'VERIFIED') {
          if (data.dish != undefined) {
            this.dish = data.dish;
            this.comments = this.dish.comments.map((info: any) => info.comment);
            this.calculateAvgStars(this.dish);
            let index = this.dish.rates.findIndex(
              (rate: any) => rate.id == this.user._id
            );
            if (index != -1) {
              let starIndex = this.dish.rates[index].rate;
              for (let i = 0; i < this.stars.length; i++) {
                if (i < starIndex) this.stars[i] = 'star.png';
                else this.stars[i] = 'emptyStar.png';
              }
              this.starsGiven = starIndex;
            }
          } else {
            this.router.navigate(['/dishes']);
          }
        } else if (data.action == 'NO_DISH') {
          this.router.navigate(['/dishes']);
        }
      });
      // this.dishesService.getDishes().subscribe((data: Dish[]) => {
      //   const dish = data.filter((dish) => dish._id == key);
      //   // console.log(dish);
      //   this.dish = dish[0];
      // });
    } else {
      this.router.navigate(['/dishes']);
    }
  }

  setStars(starIndex: number): void {
    starIndex++;
    // USUNIECIE OCENY MOZNA DODAC POZNIEJ
    for (let i = 0; i < this.stars.length; i++) {
      if (i < starIndex) this.stars[i] = 'star.png';
      else this.stars[i] = 'emptyStar.png';
    }
    this.starsGiven = starIndex;
    this.dishesService
      .rateDish(
        this.route.snapshot.paramMap.get('id'),
        this.user._id,
        starIndex
      )
      .subscribe((data: any) => {
        if (data.action == 'STARS_SET') {
          this.dish = data.dish;
          this.calculateAvgStars(this.dish);
        }
      });
  }

  calculateAvgStars(dish: Dish) {
    if (dish.rates.length != 0) {
      let sum = 0;
      for (let rate of dish.rates) sum += rate.rate;
      this.avgStars = sum / dish.rates.length;
    } else this.avgStars = -1;
  }

  addComment(comment: Commentary): void {
    this.dishesService
      .commentDish(
        this.route.snapshot.paramMap.get('id'),
        this.user._id,
        comment
      )
      .subscribe((data: any) => {
        if (data.action == 'DISH_COMMENTED') {
          this.comments.push(comment);
        }
      });
  }

  updateCommentErrors(errors: string[]): void {
    this.errors = errors;
  }
}
