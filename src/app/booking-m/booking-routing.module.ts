import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main/main.component';
import {NewBookingComponent} from './new-booking/new-booking.component';

const routes: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'new-booking/:id', component: NewBookingComponent},
  {path: '', redirectTo: 'main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
