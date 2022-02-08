import { Component, Inject, OnInit } from '@angular/core';
import { DishesService } from 'src/app/dishes.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
})
export class RestaurantComponent implements OnInit {
  dishes: DishesService[];
  basket: any[] = [];
  total: number = 0;

  constructor(dishes: DishesService) {
    this.dishes = dishes.getDishes();
    for (let i = 0; i < this.dishes.length; i++) {
      this.dishes[i].inBasket = 0;
      this.dishes[i].hide = false;
      this.dishes[i].color = 'none';
      this.dishes[i].priceSymbol = '$';
      this.basket.push({
        index: i,
        amount: 0,
      });
    }
    console.log(this.dishes);
    console.log(this.basket);
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

  addDish(dishIndex: number): void {
    if (this.basket[dishIndex].amount < this.dishes[dishIndex].available) {
      this.dishes[dishIndex].inBasket++;
      this.basket[dishIndex].amount++;
      if (this.basket[dishIndex].amount == this.dishes[dishIndex].available)
        this.dishes[dishIndex].hide = true;
    }
    this.updateCart();
  }

  removeDish(dishIndex: number): void {
    if (this.dishes[dishIndex].inBasket > 0) {
      this.dishes[dishIndex].inBasket--;
      this.basket[dishIndex].amount--;
      if (this.basket[dishIndex].amount < this.dishes[dishIndex].available)
        this.dishes[dishIndex].hide = false;
    }
    this.updateCart();
  }

  updateCart(): void {
    this.total = 0;
    for (const dish of this.basket) {
      this.total += dish.amount;
    }
  }
}
