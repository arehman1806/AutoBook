import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {RegisterComponent} from './register/register.component';
import {ThankYouComponent} from './thank-you/thank-you.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';

const routes: Routes = [
  {path: '', component: SignInComponent},
  {path: 'signin', component: SignInComponent},
  {path: 'signup', component: RegisterComponent},
  {path: 'thank-you', component: ThankYouComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionRoutingModule { }
