import { Component, OnInit } from '@angular/core';
import { PersistenceService } from 'src/app/services/persistence.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css'],
})
export class AdminViewComponent implements OnInit {
  users: User[] = [];
  persistenceName: string = '';
  persistenceID: string = '';
  userEmail: string = '';

  constructor(
    private userService: UserService,
    private persistenceService: PersistenceService
  ) {}

  ngOnInit(): void {
    this.userService.checkAuth().subscribe((data: any) => {
      if (data.action == 'VERIFIED') {
        this.userEmail = data.user.email;
      }
    });
    this.userService.getAllUsers().subscribe((data: any) => {
      if (data.action == 'USERS_GET') {
        this.users = data.users;
      }
    });
    this.persistenceService.getPersistence().subscribe((data: any) => {
      if (data.action == 'PERSISTENCE_GET') {
        this.persistenceName = data.persistence.value;
        this.persistenceID = data.persistence._id;
      }
    });
  }

  changePersistence(persistenceValue: string): void {
    this.persistenceService
      .setPersistence(persistenceValue)
      .subscribe((data: any) => {
        this.persistenceName = data.persistence.value;
        this.persistenceID = data.persistence._id;
      });
  }

  changeRole(newRole: string, oldUser: User): void {
    const oldRole = oldUser.role;
    this.userService.changeRole(newRole, oldUser).subscribe((data: any) => {
      if (data.action == 'USER_ROLE_CHANGE') {
        oldUser.role = newRole;
      } else {
        oldUser.role = oldRole;
      }
    });
  }

  changeBanUser(user: User): void {
    this.userService.changeBanUser(user).subscribe((data: any) => {
      console.log(user.email + ' active change');
    });
  }
}
