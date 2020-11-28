import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/Auth/auth.service';
import {Router} from '@angular/router';
import {$EOF} from 'codelyzer/angular/styles/chars';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public bookingForm: FormGroup;
  public forLogin = true;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }


  onSubmit($event: Event): void {
    const email = this.bookingForm.value.email;
    const password = this.bookingForm.value.password;
    if (this.forLogin) {
      this.auth.loginWithEmailAndPassword(email, password).then(
        x => {
          this.router.navigate(['booking', 'main']);
        }
      ).catch(x => {
        window.alert(x.message);
      });
    }
    else {
      this.auth.signUpWithEmailAndPassword(email, password).then(
        x => {
          this.router.navigate(['booking', 'main'])
        }
      ).catch(
        x => {
          window.alert(x.message);
        }
      )
    }
  }

  authWithGoogle(): void {
    this.auth.loginWithGoogle().then(
      x => {
        this.router.navigate(['booking', 'main']);
      }
    );
  }

  authWithMicrosoft(): void {
    this.auth.loginWithMicrosoft().then(
      x => {
        this.router.navigate(['booking', 'main']);
      }
    );
  }

  // tslint:disable-next-line:typedef
  changeFormType($event: MatSlideToggleChange) {
    this.forLogin = !$event.checked;
  }

  passwordReset() {
    this.auth.sendPasswordResetEmail(this.bookingForm.getRawValue().email).then(
      x => {
        window.alert('Verification email has been sent. You might wish to check your spam folder')
      }
    )
  }
}
