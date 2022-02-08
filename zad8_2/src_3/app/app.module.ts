import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { DishesComponent } from './components/restaurant/dishes/dishes.component';
import { DishesService } from './dishes.service';
import { SingleDishComponent } from './components/restaurant/single-dish/single-dish.component';
import { NavBarComponent } from './components/restaurant/nav-bar/nav-bar.component';
import { BasketComponent } from './components/restaurant/basket/basket.component';
import { StarComponent } from './components/restaurant/star/star.component';
import { AddDishFormComponent } from './components/restaurant/add-dish-form/add-dish-form.component';
import { FilterDishesComponent } from './components/restaurant/filter-dishes/filter-dishes.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantComponent,
    DishesComponent,
    SingleDishComponent,
    NavBarComponent,
    BasketComponent,
    StarComponent,
    AddDishFormComponent,
    FilterDishesComponent,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [DishesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
