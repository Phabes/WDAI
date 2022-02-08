import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { NgxPaginationModule } from "ngx-pagination";

import { HttpClientModule } from "@angular/common/http";
// import { AngularFireModule } from "@angular/fire";
// import { AngularFireDatabaseModule } from "@angular/fire/database";
// import { AngularFirestoreModule } from "@angular/fire/firestore";
// import { environment } from "../environments/environment";

const appRoutes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "dishes", component: RestaurantComponent },
  { path: "dish/:id", component: DishComponent },
  { path: "basket", component: BasketPageComponent },
  { path: "addDish", component: AddDishFormComponent },
  { path: "**", component: PageNotFoundComponent },
];

import { AppComponent } from "./app.component";
import { RestaurantComponent } from "./components/restaurant/restaurant.component";
import { DishesComponent } from "./components/restaurant/dishes/dishes.component";
import { DishesService } from "./services/dishes.service";
import { SingleDishComponent } from "./components/restaurant/single-dish/single-dish.component";
import { NavBarComponent } from "./components/restaurant/nav-bar/nav-bar.component";
import { BasketComponent } from "./components/restaurant/basket/basket.component";
import { StarComponent } from "./components/restaurant/star/star.component";
import { AddDishFormComponent } from "./components/restaurant/add-dish-form/add-dish-form.component";
import { FilterDishesComponent } from "./components/restaurant/filter-dishes/filter-dishes.component";
import { FooterComponent } from "./components/restaurant/footer/footer.component";
import { PageNotFoundComponent } from "./components/restaurant/page-not-found/page-not-found.component";
import { HomePageComponent } from "./components/restaurant/home-page/home-page.component";
import { BasketPageComponent } from "./components/restaurant/basket-page/basket-page.component";
import { DishComponent } from "./components/restaurant/dish/dish.component";
import { SliderComponent } from "./components/restaurant/slider/slider.component";
import { AddCommentFormComponent } from "./components/restaurant/add-comment-form/add-comment-form.component";
import { CommentComponent } from "./components/restaurant/comment/comment.component";

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
    FooterComponent,
    PageNotFoundComponent,
    HomePageComponent,
    BasketPageComponent,
    DishComponent,
    SliderComponent,
    AddCommentFormComponent,
    CommentComponent,
  ],
  imports: [
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireDatabaseModule,
    // AngularFirestoreModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [DishesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
