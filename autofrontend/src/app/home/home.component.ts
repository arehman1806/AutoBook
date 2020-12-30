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
  public loginForm: FormGroup;
  public forLogin = true;
  public selectedIndexForTabs = 0;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }


  onSubmit($event: Event): void {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    if (this.forLogin) {
      this.auth.loginWithEmailAndPassword(email, password).then(
        x => {
          this.router.navigate(['booking', 'main']);
        }
      ).catch(x => {
        window.alert(x.message);
      });
    }
  }


  // tslint:disable-next-line:typedef
  onSubmitForSignUp($event: any) {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.auth.signUpWithEmailAndPassword(email, password).then(
      x => {
        this.router.navigate(['booking', 'main'])
      }
    ).catch(
      x => {
        window.alert(x.message);
      }
    );
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

  // tslint:disable-next-line:typedef
  passwordReset() {
    this.auth.sendPasswordResetEmail(this.loginForm.getRawValue().email).then(
      x => {
        window.alert('Verification email has been sent. You might wish to check your spam folder')
      }
    )
  }
}
