import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { DishesComponent } from './components/restaurant/dishes/dishes.component';
import { DishesService } from './dishes.service';
import { SingleDishComponent } from './components/restaurant/single-dish/single-dish.component';
import { NavBarComponent } from './components/restaurant/nav-bar/nav-bar.component';
import { BasketComponent } from './components/restaurant/basket/basket.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantComponent,
    DishesComponent,
    SingleDishComponent,
    NavBarComponent,
    BasketComponent,
  ],
  imports: [BrowserModule],
  providers: [DishesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
