import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main/main.component';
import {NewBookingComponent} from './new-booking/new-booking.component';
import {AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

const redirectToLogin = () => redirectUnauthorizedTo(['']);
const routes: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'new-booking/:id', component: NewBookingComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectToLogin}},
  {path: '', redirectTo: 'main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
