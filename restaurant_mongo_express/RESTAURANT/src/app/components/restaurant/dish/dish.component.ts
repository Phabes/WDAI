import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DishesService } from 'src/app/services/dishes.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
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

  constructor(
    private route: ActivatedRoute,
    private dishesService: DishesService,
    private restaurantService: RestaurantService
  ) {
    this.comments.push({
      nick: 'NICK',
      title: 'Fajny Tytuł',
      review: 'Obszerny komentarz',
    });
    this.comments.push({
      nick: 'NICK',
      title: 'Fajny Tytuł',
      review: 'Obszerny komentarz',
    });
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
    // let id = this.route.snapshot.paramMap.get("id");
    // if (id != null)
    //   this.dishesService.getSingleDish(parseInt(id)).subscribe((data: Dish) => {
    //     this.dish = data;
    //   });
    let key = this.route.snapshot.paramMap.get('id');
    if (key != null)
      this.dishesService.getSingleDish(key).subscribe((data: any) => {
        this.dish = data;
      });
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

  addComment(comment: Commentary): void {
    this.comments.push(comment);
  }

  updateCommentErrors(errors: string[]): void {
    this.errors = errors;
  }
}
