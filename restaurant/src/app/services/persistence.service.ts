import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  constructor(private db: AngularFireDatabase, public afAuth: AngularFireAuth) {}

  getPersistence(): Observable<any> {
    return this.db.object("/settings").valueChanges();
  }

  setPersistence(persistenceValue: string): Promise<any> {
    let obj = {
      settingName: "persistence",
      value: persistenceValue
    }
    return this.db.object("/settings").update(obj)
  }
}
