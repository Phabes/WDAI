import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasketService } from 'src/app/services/basket.service';
import { UserService } from 'src/app/services/user.service';

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
  ) { }

  ngOnInit(): void {
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 800) this.changeNavStatus();
    });
    this.userService.checkAuth().subscribe((data: any) => {
      if (data != null) {
        this.userService.getUserFromDatabase(data.uid).subscribe((user: any) => {
          if (!user.activeAccount)
            this.userService.logout()
          if (!this.isLoggedIn) {
            this.isLoggedIn = true;
            this.user = user.nick;
            this.role = user.role;
            if (user.basket)
              this.basketService.setUserBasket(user.basket);
            else
              this.basketService.setUserBasket([]);
          }
        })
      }
      else {
        this.isLoggedIn = false;
        this.user = '';
        this.role = '';
        this.router.navigate(['/login'])
      }
    });
  }

  changeNavStatus(): void {
    let checkbox: any = document.getElementsByName('navi');
    checkbox[0].checked = false;
  }

  logout(): void {
    this.changeNavStatus();
    this.userService.logout()
      .then(() => {
        this.basketService.setUserBasket([])
      });
  }
}
