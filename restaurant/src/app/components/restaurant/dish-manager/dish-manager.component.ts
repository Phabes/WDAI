import { Component, OnInit } from '@angular/core';
import { DishesService } from 'src/app/services/dishes.service';
import { Dish } from 'src/models/dish';

@Component({
  selector: 'app-dish-manager',
  templateUrl: './dish-manager.component.html',
  styleUrls: ['./dish-manager.component.css'],
})
export class DishManagerComponent implements OnInit {
  dishes: Dish[] = [];
  edit: Dish = {
    _id: '',
    name: '',
    kitchenType: '',
    category: '',
    products: '',
    available: 0,
    priceUSD: 0,
    description: '',
    url: [],
    // avgStars: 0,
    rates: [],
    comments: [],
  };
  constructor(private dishesService: DishesService) { }

  ngOnInit(): void {
    this.dishesService.getDishes().subscribe((data) => {
      this.dishes = data;
    });
    this.dishesService.getMsg().subscribe((data: any) => {
      if (data.action == 'DISH_ADDED') {
        this.dishes.push(data.dish);
      }
      if (data.action == 'DISH_DELETED') {
        let index = this.dishes.findIndex((dish) => dish._id == data.id);
        this.dishes.splice(index, 1);
      }
    });
  }

  editDish(dish: Dish): void {
    this.edit = dish;
  }

  deleteDish(dish: Dish): void {
    if (confirm("Czy na pewno chcesz usunąć danie?"))
      this.dishesService.removeDish(dish._id);
  }
}
