import { Component, OnInit } from "@angular/core";
import { RestaurantService } from "src/app/services/restaurant.service";
import { DishesService } from "src/app/services/dishes.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent implements OnInit {
  constructor(
    private restaurantService: RestaurantService,
    private dishesService: DishesService
  ) {}

  ngOnInit(): void {}

  changeCurrency(e: any): void {
    this.restaurantService.sendMsg(e.target.value);
    this.dishesService.changeCurrency(e.target.value);
  }
}
