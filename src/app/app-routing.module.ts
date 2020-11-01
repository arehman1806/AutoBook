import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CalenderComponent} from "./calender/calender.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'calender', component: CalenderComponent},
  {path: '', redirectTo: 'calender', pathMatch: 'full'}
  // {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
