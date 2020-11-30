import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionRoutingModule } from './session-routing.module';
import {RegisterComponent} from './register/register.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {ThankYouComponent} from './thank-you/thank-you.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FlexModule} from '@angular/flex-layout';
import { CommonSignInComponent } from './common-sign-in/common-sign-in.component';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [
    RegisterComponent,
    SignInComponent,
    ThankYouComponent,
    ForgotPasswordComponent,
    CommonSignInComponent],
  imports: [
    CommonModule,
    SessionRoutingModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FlexModule,
    MatCheckboxModule
  ]
})
export class SessionModule { }
