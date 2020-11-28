import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import 'firebase/auth';
import auth from 'firebase/app';
import {UserProfile} from '../../shared/UserProfile';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import firebase from 'firebase';
import UserCredential = firebase.auth.UserCredential;
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
              private afStore: AngularFirestore,
              private router: Router) {
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
          uid: profileFromFirebase.uid,
          email: profileFromFirebase.email,
          connectedPlatforms: []
        };
        return this.afStore.doc(`users/${profileFromFirebase.uid}`).set(s);
      }
      console.log(result);
    });
  }

  loginWithMicrosoft(): Promise<void> {
    const provider = new auth.auth.OAuthProvider('microsoft.com');
    provider.setCustomParameters({
      // Force re-consent.
      prompt: 'consent',
      // Target specific email with login hint.
      login_hint: 'sxxxxxxx@ed.ac.uk'
    });

    return this.afAuth.signInWithPopup(provider).then(
      (result) => {
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
      }
    );

  }

  // tslint:disable-next-line:typedef
  connectANewPlatform(platformID: string) {
    this.uid$.subscribe(
      (uid) => {
        return true;
      }
    );
  }

  // tslint:disable-next-line:typedef
  signOut() {
    return this.afAuth.signOut().then( x => {
      this.router.navigate(['home']);
    });
  }

  signUpWithEmailAndPassword(email: string, password: string): Promise<void | UserCredential> {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then(
      (result) => {
        if (result) {
          result.user.sendEmailVerification();
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
        }
    );
  }

  loginWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  sendPasswordResetEmail(email) {
    return this.afAuth.sendPasswordResetEmail(email);
  }
}

