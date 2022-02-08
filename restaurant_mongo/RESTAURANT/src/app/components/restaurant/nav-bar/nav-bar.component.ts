import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersistenceService } from 'src/app/services/persistence.service';
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
    private persistentService: PersistenceService
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
      }
    });
    this.userService.getUser().subscribe((data: any) => {
      this.isLoggedIn = data.isLoggedIn;
      this.user = data.nick;
      this.role = data.role;
    });
  }

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
