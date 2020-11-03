import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  // tslint:disable-next-line:typedef
  createUserWithEmailAndPassword(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password).then(
      (response) => {
        response.user.sendEmailVerification().then(
          x => {
            window.alert('Success!');
          }
        ).catch(x => {window.alert('User created but can not send verification email')});
      }
    ).catch(
      (x) => {
        window.alert('Sign Up failed!');
      }
    );
  }
}
