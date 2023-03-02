import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, Subject } from 'rxjs';

import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  subject = new Subject();

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }

  changeUser(data: any) {
    this.subject.next(data);
  }

  getUser(): Observable<any> {
    return this.subject.asObservable();
  }

  getUserFromDatabase(userId: string): Observable<any> {
    return this.db.object("/users/" + userId).valueChanges()
  }

  registerUser(email: string, password: string): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
  }

  registerUserInDatabase(user: any, userId: string): Promise<any> {
    let newUser = {
      _id: userId,
      nick: user.nick,
      email: user.email,
      role: 'client',
      purchaseHistory: [],
      activeAccount: true,
    };
    return this.db.list("/users").set(userId, newUser)
  }

  loginUser(user: any): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(user.email, user.password)
  }

  logout(): Promise<any> {
    return this.afAuth.signOut()
  }

  checkAuth(): Observable<any> {
    return this.afAuth.authState
  }

  placeAnOrder(orders: any, userId: string) {
    return this.db.list("/users/" + userId + "/purchaseHistory").push(orders)
  }

  getAllUsers(): Observable<any> {
    return this.db.list("/users").valueChanges()
  }

  changeBanUser(user: User) {
    user.activeAccount = !user.activeAccount
    this.db.object("/users/" + user._id).update(user)
    // lub
    // this.db.list("/users").set(user._id.toString(), user)
  }

  changeRole(newRole: string, oldUser: User) {
    oldUser.role = newRole
    this.db.list("/users").set(oldUser._id.toString(), oldUser)
    // lub
    // this.db.object("/users").update(oldUser)
  }

  updateBasket(basket: any, userId: string) {
    this.db.object("/users/" + userId + "/basket").set(basket)
  }
}
