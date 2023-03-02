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
  ) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data: any) => {
      this.users = data;
    });
    this.persistenceService.getPersistence().subscribe((data: any) => {
      this.persistenceName = data.value;
    });
  }

  changePersistence(persistenceValue: string): void {
    this.persistenceService
      .setPersistence(persistenceValue)
      .then((data: any) => {
        this.persistenceName = persistenceValue
      });
  }

  changeRole(newRole: string, oldUser: User): void {
    this.userService.changeRole(newRole, oldUser)
  }

  changeBanUser(user: User): void {
    this.userService.changeBanUser(user)
  }
}
