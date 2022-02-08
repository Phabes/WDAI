import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { BasketDish } from "src/models/basketDish";
import { Dish } from "src/models/dish";

@Injectable({
  providedIn: "root",
})
export class BasketService {
  subject = new Subject();
  basket: BasketDish[] = [];

  constructor() {
    this.basket = [
      {
        dish: {
          dishID: 0,
          key: "0",
          name: "Kurczak z ryżem",
          kitchenType: "Polska",
          category: "Mięsne",
          products: "Kurczak, Ryż, Pieczarki",
          available: 20,
          priceUSD: 5.99,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis sollicitudin lectus, ac lobortis felis. Duis leo nulla, convallis nec malesuada ac, tristique et ex. Sed nec odio et mauris semper tristique. Aliquam suscipit eleifend arcu. Etiam quis sodales orci. Cras auctor nec ligula ac hendrerit. Donec placerat hendrerit lorem, in tincidunt massa tristique a. In lectus nisl, mattis eu vestibulum ac, tristique nec eros.",
          url: [
            "https://images.aws.nestle.recipes/resized/50c8c84a669bf98e2c696ad1d142c255_kurczak_faszerowany_ryżem__19_944_531.jpg",
          ],
          avgStars: 4.5,
        },
        quantity: 3,
      },
      {
        dish: {
          dishID: 3,
          key: "3",
          name: "Zupa pomidorowa",
          kitchenType: "Polska",
          category: "Zupa",
          products: "2 litry wody, 200g koncetratu pomidorowego",
          available: 8,
          priceUSD: 4.49,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis sollicitudin lectus, ac lobortis felis. Duis leo nulla, convallis nec malesuada ac, tristique et ex. Sed nec odio et mauris semper tristique. Aliquam suscipit eleifend arcu. Etiam quis sodales orci. Cras auctor nec ligula ac hendrerit. Donec placerat hendrerit lorem, in tincidunt massa tristique a. In lectus nisl, mattis eu vestibulum ac, tristique nec eros.",
          url: [
            "https://s3.przepisy.pl/przepisy3ii/img/variants/800x0/zupa-pomidorowa.jpg",
          ],
          avgStars: 4,
        },
        quantity: 5,
      },
      {
        dish: {
          dishID: 4,
          key: "4",
          name: "Dal makhani",
          kitchenType: "Indyjska",
          category: "Wegańska",
          products: "Imbir, fasole, chili, cebula",
          available: 10,
          priceUSD: 5.49,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis sollicitudin lectus, ac lobortis felis. Duis leo nulla, convallis nec malesuada ac, tristique et ex. Sed nec odio et mauris semper tristique. Aliquam suscipit eleifend arcu. Etiam quis sodales orci. Cras auctor nec ligula ac hendrerit. Donec placerat hendrerit lorem, in tincidunt massa tristique a. In lectus nisl, mattis eu vestibulum ac, tristique nec eros.",
          url: [
            "https://www.pyszne.pl/foodwiki/uploads/sites/7/2018/03/dal-makhani.jpg",
          ],
          avgStars: 4,
        },
        quantity: 2,
      },
      // {
      //   dish: {
      //     dishID: 5,
      //     key: "5",
      //     name: "Zupa cebulowa",
      //     kitchenType: "Francuska",
      //     category: "Zupa",
      //     products: "Cebule, grzanki, ser Gruyere",
      //     available: 10,
      //     priceUSD: 3.69,
      //     description:
      //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis sollicitudin lectus, ac lobortis felis. Duis leo nulla, convallis nec malesuada ac, tristique et ex. Sed nec odio et mauris semper tristique. Aliquam suscipit eleifend arcu. Etiam quis sodales orci. Cras auctor nec ligula ac hendrerit. Donec placerat hendrerit lorem, in tincidunt massa tristique a. In lectus nisl, mattis eu vestibulum ac, tristique nec eros.",
      //     url: [
      //       "https://zwiedzamyparyz.pl/wp-content/uploads/2018/12/zupa-cebulowa.jpg",
      //     ],
      //     avgStars: 2,
      //   },
      //   quantity: 1,
      // },
      {
        dish: {
          dishID: 7,
          name: "Ratatuj",
          kitchenType: "Francuska",
          category: "Przystawka",
          products: "Papryka, cukinia, bakłażan, pomidory, cebula",
          available: 12,
          priceUSD: 5.29,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis sollicitudin lectus, ac lobortis felis. Duis leo nulla, convallis nec malesuada ac, tristique et ex. Sed nec odio et mauris semper tristique. Aliquam suscipit eleifend arcu. Etiam quis sodales orci. Cras auctor nec ligula ac hendrerit. Donec placerat hendrerit lorem, in tincidunt massa tristique a. In lectus nisl, mattis eu vestibulum ac, tristique nec eros.",
          url: [
            "https://zwiedzamyparyz.pl/wp-content/uploads/2018/12/ratatuj-ratatouille.jpg",
          ],
          avgStars: 4.5,
        },
        quantity: 1,
      },
      {
        dish: {
          dishID: 2,
          key: "2",
          name: "Pierogi z mięsem",
          kitchenType: "Polska",
          category: "Danie Główne",
          products: "Mięso wołowe, 1/4 cebuli, 500g mąki",
          available: 2,
          priceUSD: 2.99,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis sollicitudin lectus, ac lobortis felis. Duis leo nulla, convallis nec malesuada ac, tristique et ex. Sed nec odio et mauris semper tristique. Aliquam suscipit eleifend arcu. Etiam quis sodales orci. Cras auctor nec ligula ac hendrerit. Donec placerat hendrerit lorem, in tincidunt massa tristique a. In lectus nisl, mattis eu vestibulum ac, tristique nec eros.",
          url: [
            "https://kuchnia-marty.pl/wp-content/uploads/2014/09/pierogi9.jpg",
          ],
          avgStars: 5,
        },
        quantity: 1,
      },
    ];
  }

  addDish(dish: Dish): void {
    let obj = {
      dish: dish,
      action: "add",
    };
    let index = null;
    for (let i = 0; i < this.basket.length; i++) {
      if (dish.key == this.basket[i].dish.key) {
        index = i;
        break;
      }
    }
    if (index == null) {
      let newBasketDish: BasketDish = {
        dish: dish,
        quantity: 1,
      };
      this.basket.push(newBasketDish);
    } else {
      this.basket[index].quantity++;
    }
    this.subject.next(obj);
  }

  deleteDish(dish: Dish): void {
    let obj = {
      dish: dish,
      action: "delete",
    };
    for (let i = 0; i < this.basket.length; i++) {
      if (dish.key == this.basket[i].dish.key) {
        this.basket[i].quantity--;
        if (this.basket[i].quantity == 0) this.basket.splice(i, 1);
        break;
      }
    }
    this.subject.next(obj);
  }

  removeDish(dish: Dish): void {
    let obj = {
      dish: dish,
      action: "removeFromBasket",
    };
    for (let i = this.basket.length - 1; i >= 0; i--) {
      if (dish.key == this.basket[i].dish.key) {
        this.basket.splice(i, 1);
      }
    }
    this.subject.next(obj);
  }

  getMsg(): any {
    return this.subject.asObservable();
  }

  getBasket(): BasketDish[] {
    return this.basket;
  }
}
