import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  emailSent = false;

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  resendVerificationEmail() {
    this.afAuth.user.subscribe(
      (user) => {
        if (user) {
          user.sendEmailVerification().then( x => {
            this.emailSent = true;
          });
        }
      }
    );
  }
}
