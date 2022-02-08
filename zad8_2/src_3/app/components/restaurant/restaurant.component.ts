import { Component, OnInit, ViewChild } from '@angular/core';
import { DishesService } from 'src/app/dishes.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
})
export class RestaurantComponent implements OnInit {
  dishes: DishesService[];
  dishesCopy: DishesService[];
  // basket: any[] = [];
  total: number = 0;
  currency: string = '$'; // 0 - $, 1 - €
  rate: number = 1;
  selectedDish: DishesService | undefined = undefined;

  constructor(dishes: DishesService) {
    this.dishes = dishes.getDishes();
    this.dishesCopy = [...this.dishes];
    for (let i = 0; i < this.dishes.length; i++) {
      this.dishes[i].inBasket = 0;
      this.dishes[i].hide = false;
      this.dishes[i].color = '6px solid white';
      this.dishes[i].priceSymbol = '$';
      // this.basket.push({
      //   index: i,
      //   amount: 0,
      // });
    }
    console.log(this.dishes);
    // console.log(this.basket);
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

  ngOnInit(): void {
    this.refreshAll();
    this.selectFirst();
  }

  selectFirst(): void {
    this.selectedDish = this.dishes[0];
  }

  refreshAll(): void {
    for (const dish of this.dishes) {
      dish.color = '6px solid white';
    }
    let expensiveIndex = this.findMostExpensive();
    let cheapIndex = this.findCheapest();
    if (expensiveIndex != cheapIndex) {
      this.dishes[expensiveIndex].color = '6px solid red';
      this.dishes[cheapIndex].color = '6px solid green';
    } else {
      this.dishes[expensiveIndex].color = '6px solid green';
    }
  }

  findMostExpensive(): number {
    let index = 0;
    for (let i = 1; i < this.dishes.length; i++) {
      if (this.dishes[i].priceUSD > this.dishes[index].priceUSD) index = i;
    }
    return index;
  }

  findCheapest(): number {
    let index = 0;
    for (let i = 1; i < this.dishes.length; i++) {
      if (this.dishes[i].priceUSD < this.dishes[index].priceUSD) index = i;
    }
    return index;
  }

  addToBasket(dishIndex: number): void {
    if (this.dishes[dishIndex].inBasket < this.dishes[dishIndex].available) {
      this.dishes[dishIndex].inBasket++;
      // this.basket[dishIndex].amount++;
      if (this.dishes[dishIndex].inBasket == this.dishes[dishIndex].available)
        this.dishes[dishIndex].hide = true;
    }
    this.selectedDish = this.dishes[dishIndex];
    this.updateCart();
  }

  removeFromBasket(dishIndex: number): void {
    if (this.dishes[dishIndex].inBasket > 0) {
      this.dishes[dishIndex].inBasket--;
      // this.basket[dishIndex].amount--;
      if (this.dishes[dishIndex].inBasket < this.dishes[dishIndex].available)
        this.dishes[dishIndex].hide = false;
    }
    this.updateCart();
  }

  addDish(dish: DishesService): void {
    // console.log(dish);
    dish.inBasket = 0;
    dish.hide = false;
    dish.color = '6px solid white';
    dish.priceSymbol = this.currency;
    this.dishes.push(dish);
    this.refreshAll();
  }

  removeDish(dishIndex: number): void {
    if (this.dishes[dishIndex] == this.selectedDish) {
      this.selectFirst();
    }
    this.dishes.splice(dishIndex, 1);
    this.updateCart();
    this.refreshAll();
  }

  updateCart(): void {
    this.total = 0;
    for (const dish of this.dishes) {
      this.total += dish.inBasket;
    }
  }

  changeCurrency(e: any): void {
    if (e.target.value == 'USD') {
      this.currency = '$';
      this.rate = 1;
      this.changeDishesCurrency('$');
    } else {
      this.currency = '€';
      this.rate = 0.8861;
      this.changeDishesCurrency('€');
    }
  }

  changeDishesCurrency(symbol: string): void {
    for (const dish of this.dishes) {
      dish.priceSymbol = symbol;
    }
  }
}
