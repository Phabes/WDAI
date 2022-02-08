import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { User } from 'src/models/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  subject = new Subject();

  constructor(private httpClient: HttpClient) {}

  changeUser(data: any) {
    this.subject.next(data);
  }

  getUser(): Observable<any> {
    return this.subject.asObservable();
  }

  registerUser(user: any): Observable<any> {
    let newUser = {
      nick: user.nick,
      email: user.email,
      password: user.password,
      role: 'client',
      purchaseHistory: [],
      activeAccount: true,
    };
    return this.httpClient.post<any>(
      `http://localhost:5000/registerUser`,
      {
        newUser: newUser,
      },
      httpOptions
    );
  }

  loginUser(user: any): Observable<any> {
    return this.httpClient.post<any>(
      `http://localhost:5000/loginUser`,
      {
        email: user.email,
        password: user.password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.httpClient.post<any>(
      `http://localhost:5000/logoutUser`,
      {},
      httpOptions
    );
  }

  checkAuth(): Observable<any> {
    return this.httpClient.post<any>(
      `http://localhost:5000/authUser`,
      {},
      httpOptions
    );
  }

  placeAnOrder(orders: any): Observable<any> {
    return this.httpClient.post<any>(
      'http://localhost:5000/placeAnOrder',
      { orders: orders },
      httpOptions
    );
  }

  checkIfBought(id: string): Observable<any> {
    return this.httpClient.post<any>(
      'http://localhost:5000/checkIfBought',
      { id: id },
      httpOptions
    );
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.post<User[]>(
      'http://localhost:5000/getAllUsers',
      {},
      httpOptions
    );
  }

  changeBanUser(user: User): Observable<any> {
    return this.httpClient.post(
      'http://localhost:5000/changeBanUser',
      user,
      httpOptions
    );
  }

  changeRole(newRole: string, oldUser: User): Observable<any> {
    return this.httpClient.post(
      'http://localhost:5000/changeRole',
      {
        oldUser: oldUser,
        newRole: newRole,
      },
      httpOptions
    );
  }
}
