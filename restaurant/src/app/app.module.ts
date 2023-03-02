import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from "../environments/environment";

import { AuthGuard } from './guard/auth.guard';

import { AppComponent } from './app.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { DishesComponent } from './components/restaurant/dishes/dishes.component';
import { DishesService } from './services/dishes.service';
import { SingleDishComponent } from './components/restaurant/single-dish/single-dish.component';
import { NavBarComponent } from './components/restaurant/nav-bar/nav-bar.component';
import { BasketComponent } from './components/restaurant/basket/basket.component';
import { StarComponent } from './components/restaurant/star/star.component';
import { AddDishFormComponent } from './components/restaurant/add-dish-form/add-dish-form.component';
import { FilterDishesComponent } from './components/restaurant/filter-dishes/filter-dishes.component';
import { FooterComponent } from './components/restaurant/footer/footer.component';
import { PageNotFoundComponent } from './components/restaurant/page-not-found/page-not-found.component';
import { HomePageComponent } from './components/restaurant/home-page/home-page.component';
import { BasketPageComponent } from './components/restaurant/basket-page/basket-page.component';
import { DishComponent } from './components/restaurant/dish/dish.component';
import { SliderComponent } from './components/restaurant/slider/slider.component';
import { AddCommentFormComponent } from './components/restaurant/add-comment-form/add-comment-form.component';
import { RegisterFormComponent } from './components/restaurant/register-form/register-form.component';
import { LoginFormComponent } from './components/restaurant/login-form/login-form.component';
import { UserService } from './services/user.service';
import { AdminViewComponent } from './components/restaurant/admin-view/admin-view.component';
import { DishManagerComponent } from './components/restaurant/dish-manager/dish-manager.component';
import { EditDishFormComponent } from './components/restaurant/edit-dish-form/edit-dish-form.component';

const appRoutes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'dishes', component: RestaurantComponent },
  {
    path: 'dish/:id',
    component: DishComponent,
    canActivate: [AuthGuard],
    data: { permissioned: ['client', 'manager', 'admin'] },
  },
  {
    path: 'basket',
    component: BasketPageComponent,
    canActivate: [AuthGuard],
    data: { permissioned: ['client'] },
  },
  {
    path: 'register',
    component: RegisterFormComponent,
  },
  {
    path: 'login',
    component: LoginFormComponent,
  },
  {
    path: 'dishManager',
    component: DishManagerComponent,
    canActivate: [AuthGuard],
    data: { permissioned: ['manager', 'admin'] },
  },
  {
    path: 'adminView',
    component: AdminViewComponent,
    canActivate: [AuthGuard],
    data: { permissioned: ['admin'] },
  },
  { path: '**', component: PageNotFoundComponent },
];

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
    RegisterFormComponent,
    LoginFormComponent,
    AdminViewComponent,
    DishManagerComponent,
    EditDishFormComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule],
  providers: [DishesService, UserService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
