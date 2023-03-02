import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PersistenceService } from './services/persistence.service';
import { UserService } from './services/user.service';

export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'RESTAURANT';
  subscription: Subscription = new Subscription();
  persistenceName: string = 'local';

  constructor(
    private router: Router,
    private persistenceService: PersistenceService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !this.router.navigated;
        this.persistenceService.getPersistence().subscribe((data: any) => {
          this.persistenceName = data.value;
          if (this.persistenceName == 'none' && browserRefresh) {
            this.userService.logout().then((e) => {
              const dataToPass = {
                nick: '',
                role: '',
                isLoggedIn: false,
              };
              this.userService.changeUser(dataToPass);
              this.router.navigate(['/login']);
            })
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
