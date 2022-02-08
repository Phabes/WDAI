import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasketService } from 'src/app/services/basket.service';
import { DishesService } from 'src/app/services/dishes.service';
import { UserService } from 'src/app/services/user.service';
import { Dish } from 'src/models/dish';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isLoggedIn: boolean = false;
  user: string = '';
  role: string = '';
  constructor(
    private router: Router,
    private userService: UserService,
    private basketService: BasketService,
    private dishesService: DishesService
  ) {}

  ngOnInit(): void {
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 800) this.changeNavStatus();
    });
    this.userService.checkAuth().subscribe((data: any) => {
      if (data.action == 'VERIFIED') {
        this.isLoggedIn = true;
        this.user = data.user.nick;
        this.role = data.user.role;
        // this.dishesService
        //   .findDishesToBasket(data.user.basket)
        //   .subscribe((dishes: Dish[]) => {
        //     let a = data.user.basket.map((e: any) => {
        //       return e._id;
        //     });
        //     let xd = dishes.filter((element: Dish) => {
        //       return a.includes(element._id);
        //     });
        //     let xd2 = xd.map((e) => {
        //       return {
        //         dish: e,
        //         quantity:
        //           data.user.basket[this.findIndex(data.user.basket, e._id)]
        //             .quantity,
        //       };
        //     });
        //     // let xd2 = []
        //     // data.user.basket.forEach((element:any) => {
        //     //   if(element._id==)
        //     // });
        //     console.log(xd2);
        //     this.basketService.setUserBasket(xd2);
        //   });
        this.basketService.setUserBasket(data.user.basket);
      }
    });
    this.userService.getUser().subscribe((data: any) => {
      this.isLoggedIn = data.isLoggedIn;
      this.user = data.nick;
      this.role = data.role;
      if (this.isLoggedIn) {
        this.userService.getBasket().subscribe((data2: any) => {
          if (data2.action == 'BASKET_GET')
            this.basketService.setUserBasket(data2.user.basket);
        });
      }
    });
  }

  // findIndex(arr: any, _id: string): number {
  //   for (let i = 0; i < arr.length; i++) {
  //     if (arr[i]._id == _id) return i;
  //   }
  //   return -1;
  // }

  changeNavStatus(): void {
    let checkbox: any = document.getElementsByName('navi');
    checkbox[0].checked = false;
  }

  logout(): void {
    this.changeNavStatus();
    this.userService.logout().subscribe(() => {
      // this.userService.user = '';
      this.isLoggedIn = false;
      this.user = '';
      this.role = '';
      this.router.navigate(['/login']);
    });
  }
}
