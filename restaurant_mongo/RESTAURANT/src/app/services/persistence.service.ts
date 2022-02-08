import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  constructor(private httpClient: HttpClient) {}

  getPersistence(): Observable<any> {
    return this.httpClient.post<any>(
      'http://localhost:5000/getPersistence',
      {},
      httpOptions
    );
  }

  setPersistence(persistenceValue: string): Observable<any> {
    return this.httpClient.post<any>(
      'http://localhost:5000/setPersistence',
      { persistenceValue: persistenceValue },
      httpOptions
    );
  }
}
