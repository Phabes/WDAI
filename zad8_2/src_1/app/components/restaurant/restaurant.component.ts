import { Component, Inject, OnInit } from '@angular/core';
import { DishesService } from 'src/app/dishes.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
})
export class RestaurantComponent implements OnInit {
  dishes: DishesService[];
  basket: any = [];

  constructor(dishes: DishesService) {
    this.dishes = dishes.getDishes();
    console.log(this.dishes);
    // this.all = [
    //   {
    //     name: 'Kurczak faszerowany ryżem i pieczarkami',
    //     kitchenType: 'Polska',
    //     category: 'Danie Główne',
    //     products: [],
    //     available: 30,
    //     priceUSD: 5.99,
    //     description:
    //       'Kurczak pieczony w całości z farszem z ryżu pieczarek i natki pietruszki to wspaniały pomysł na niedzielny obiad. Chrupiąca skórka kurczaka z dodatkiem ryżu i pieczarek to niesamowicie smaczne połączenie, które daje całość obiadu!',
    //     url: 'https://images.aws.nestle.recipes/resized/50c8c84a669bf98e2c696ad1d142c255_kurczak_faszerowany_ryżem__19_944_531.jpg',
    //   },
    //   {
    //     name: 'Kurczak faszerowany ryżem i pieczarkami2',
    //     kitchenType: 'Polska2',
    //     category: 'Danie Główne2',
    //     products: [],
    //     available: 20,
    //     priceUSD: 3.99,
    //     description:
    //       'Kurczak pieczony w całości z farszem z ryżu pieczarek i natki pietruszki to wspaniały pomysł na niedzielny obiad. Chrupiąca skórka kurczaka z dodatkiem ryżu i pieczarek to niesamowicie smaczne połączenie, które daje całość obiadu!',
    //     url: 'https://images.aws.nestle.recipes/resized/50c8c84a669bf98e2c696ad1d142c255_kurczak_faszerowany_ryżem__19_944_531.jpg',
    //   },
    // ];
    // console.log(JSON.stringify(this.all));
  }

  ngOnInit(): void {}
}
