import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {VerifyEmailComponent} from './verify-email/verify-email.component';
import {RedirectEmailVerified} from './guards/redirect-email-verified';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'verify-email', component: VerifyEmailComponent, canActivate: [RedirectEmailVerified]},
  {path: 'booking',
    loadChildren: () => import ('./booking-m/booking.module').then(m => m.BookingModule)},
  {path: '', redirectTo: 'booking', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
