import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/models/user';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public userService: UserService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.userService.checkAuth().subscribe((data) => {
        if (data != null) {
          this.userService.getUserFromDatabase(data.uid).subscribe((user: User) => {
            if (user) {
              if (user.activeAccount) {
                const permissioned = route.data['permissioned'];
                if (permissioned.includes(user.role)) {
                  observer.next(true);
                } else {
                  this.router.navigate(['/']);
                }
              } else {
                this.router.navigate(['/login']);
              }
            } else {
              this.router.navigate(['/login']);
            }
          })
        } else {
          this.router.navigate(['/login']);
        }
      });
    });
  }
}
// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { User } from 'src/models/user';
// import { UserService } from '../services/user.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(public userService: UserService, public router: Router) { }

//   canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
//     return new Observable<boolean>((observer) => {
//     this.userService.afAuth.currentUser.then((user: any) => {
//       if(user){
//         this.userService.getUserFromDatabase(user.uid).subscribe((user: User) => {
//           if (user) {
//             if (user.activeAccount) {
//               const permissioned = route.data['permissioned'];
//               if (permissioned.includes(user.role)) {
//                 observer.next(true);
//               } else {
//                 this.router.navigate(['/']);
//               }
//             } else {
//               this.router.navigate(['/login']);
//             }
//           } else {
//             this.router.navigate(['/login']);
//           }
//         })
//       }
//       else {
//         this.router.navigate(['/login'])
//       }
//     })
//     });
//   }
// }
