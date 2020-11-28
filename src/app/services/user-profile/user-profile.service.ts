import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from '../Auth/auth.service';
import {map} from 'rxjs/operators';
import {UserProfile} from '../../shared/UserProfile';
import {BehaviorSubject, Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  connectedPlatforms = new BehaviorSubject(null);
  connectedPlatforms$: Observable<string[]> = this.connectedPlatforms.asObservable();

  constructor(private afStore: AngularFirestore,
              private auth: AuthService,
              private afAuth: AngularFireAuth) {

    this.auth.user$.subscribe(
      (user) => {
        if (user) {
          this.afStore.doc(`users/${user.uid}/`).valueChanges().subscribe(
            (resp) => {
              const profile = resp as UserProfile;
              this.connectedPlatforms.next(profile.connectedPlatforms)
            }
          );
        }
      }
      );
  }
}
