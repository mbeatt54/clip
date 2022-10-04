import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, delay, map } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IUser } from '../_models/user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection<IUser>;

  isAuthenticated$: Observable<boolean>;
  isAuthenticatedWithDelay$: Observable<boolean>;

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {
    this.usersCollection = db.collection('users');
    this.isAuthenticated$ = auth.user.pipe(map((result) => !!result));
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(delay(750));
  }

  async createUser(userData: IUser) {
    if (!userData.password) {
      throw new Error('Password not provided');
    }

    const userCred = await this.auth.createUserWithEmailAndPassword(userData.email, userData.password);

    await this.usersCollection.doc(userCred.user?.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber,
    });

    await userCred.user?.updateProfile({
      displayName: userData.name,
    });
  }
}
