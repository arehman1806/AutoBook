import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import 'firebase/auth';
import auth from 'firebase/app';
import {UserProfile} from '../../shared/UserProfile';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$ = this.afAuth.user;
  uid$ = this.user$.pipe(
    map((resp) => {
      if (resp) {return resp.uid; }
    })
  );

  constructor(private afAuth: AngularFireAuth,
              private afStore: AngularFirestore) {
  }

  // tslint:disable-next-line:typedef
  createUserWithEmailAndPassword(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password).then(
      (response) => {
        response.user.sendEmailVerification().then(
          x => {
            window.alert('Success!');
          }
        ).catch(x => {
          window.alert('User created but can not send verification email')
        });
      }
    ).catch(
      (x) => {
        window.alert('Sign Up failed!');
      }
    );
  }

  loginWithGoogle(): Promise<void> {
    const provider = new auth.auth.GoogleAuthProvider();
    return this.afAuth.signInWithPopup(provider).then((result) => {
      if (result.additionalUserInfo.isNewUser && result) {
        const profileFromFirebase = result.user;
        const s: UserProfile = {
          displayName: profileFromFirebase.displayName,
          email: profileFromFirebase.email,
          uid: profileFromFirebase.uid,
          connectedPlatforms: []
        };
        return this.afStore.doc(`users/${profileFromFirebase.uid}`).set(s);
      }
      console.log(result);
    });
  }

  connectANewPlatform(platformID: string) {
    this.uid$.subscribe(
      (uid) => {
        return true
      }
    )
  }
}

