import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public userService: UserService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.userService.checkAuth().subscribe((data) => {
        const { user } = data;
        if (user) {
          const permissioned = route.data['permissioned'];
          if (permissioned.includes(user.role)) {
            observer.next(true);
          } else {
            this.router.navigate(['/']);
            // observer.next(false);
          }
        } else {
          this.router.navigate(['/login']);
        }
      });
    });
  }
}
