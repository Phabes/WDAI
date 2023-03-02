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
  basket: BasketDish[] = []
  history: any[] = []
  userId = ""

  constructor(
    private basketService: BasketService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.basket = this.basketService.getBasket();
    this.basketService.getMsg().subscribe((data: any) => {
      if (data == 'BASKET_CLEARED') this.basket = [];
    });

    this.userService.checkAuth().subscribe(user => {
      if (user != null) {
        this.userId = user.uid
        this.userService.getUserFromDatabase(this.userId).subscribe((data: any) => {
          if (data.purchaseHistory) {
            this.history = []
            let purchaseHistory = Object.values(data.purchaseHistory)
            purchaseHistory.forEach((element: any) => {
              element.forEach((data: any) => {
                let time = new Date(data.orderDate)
                let historyObject = {
                  name: data.name,
                  quantity: data.quantity,
                  orderDate: time.getDate() + "." + time.getMonth() + 1 + "." + time.getFullYear()
                }
                this.history.push(historyObject)
              });
            });

          }
        })
      }
      else
        this.userId = ""
    })
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
    if (confirm('CZY NA PEWNO CHCESZ ZŁOŻYĆ ZAMÓWIENIE?')) {
      const currentDate = new Date();
      const pass = this.basket.map((element) => {
        return {
          _id: element.dish._id,
          name: element.dish.name,
          quantity: element.quantity,
          orderDate: currentDate.getTime(),
        };
      });
      this.userService.placeAnOrder(pass, this.userId)
        .then((data: any) => {
          this.basketService.clearBasket();
        }).catch(e => {
          console.log(e.message)
        })
    }
  }
}

