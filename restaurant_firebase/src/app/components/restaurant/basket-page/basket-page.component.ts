import { Component, OnInit } from "@angular/core";
import { BasketService } from "src/app/services/basket.service";
import { BasketDish } from "src/models/basketDish";

@Component({
  selector: "app-basket-page",
  templateUrl: "./basket-page.component.html",
  styleUrls: ["./basket-page.component.css"],
})
export class BasketPageComponent implements OnInit {
  basket: BasketDish[] = [];

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.basket = this.basketService.getBasket();
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
}
