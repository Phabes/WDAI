import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/services/basket.service';
import { UserService } from 'src/app/services/user.service';
import { BasketDish } from 'src/models/basketDish';

@Component({
  selector: 'app-basket-page',
  templateUrl: './basket-page.component.html',
  styleUrls: ['./basket-page.component.css'],
})
export class BasketPageComponent implements OnInit {
  basket: BasketDish[] = [];

  constructor(
    private basketService: BasketService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.basket = this.basketService.getBasket();
    this.basketService.getMsg().subscribe((data: any) => {
      if (data == 'BASKET_CLEARED') this.basket = [];
    });
  }

  addButtonClick(basketDish: BasketDish): void {
    if (basketDish.dish.available > basketDish.quantity) {
      this.basketService.addDish(basketDish.dish);
    }
  }

  removeButtonClick(basketDish: BasketDish): void {
    if (basketDish.quantity > 0) {
      this.basketService.deleteDish(basketDish.dish);
    }
  }

  placeAnOrder(): void {
    const currentDate = new Date();
    if (confirm('CZY NA PEWNO CHCESZ ZŁOŻYĆ ZAMÓWIENIE?')) {
      const pass = this.basket.map((element) => {
        return {
          _id: element.dish._id,
          name: element.dish.name,
          quantity: element.quantity,
          orderDate: currentDate.getTime(),
        };
      });
      this.userService.placeAnOrder(pass).subscribe((data: any) => {
        this.basketService.clearBasket();
      });
    }
  }
}
