import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingMRoutingModule } from './landing-m-routing.module';
import { FeaturesComponent } from './features/features.component';
import {LandingComponent} from './landing/landing.component';
import { ServicesComponent } from './services/services.component';
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';
import {FeatherModule} from 'angular-feather';

import {
  Grid, Edit, Headphones, Layers, Code, Tablet, BarChart2, Check, PieChart, ArrowRight, Bookmark, Coffee, Award,
  UserPlus, MapPin, Mail, Phone
} from 'angular-feather/icons';

const icons = {
  Grid, Edit, Headphones, Layers, Code, Tablet, BarChart2, Check, PieChart, ArrowRight, Bookmark,
  UserPlus, Coffee, Award, MapPin, Mail, Phone
};

@NgModule({
  declarations: [LandingComponent, FeaturesComponent, ServicesComponent],
  exports: [
    FeaturesComponent,
    ServicesComponent
  ],
  imports: [
    CommonModule,
    LandingMRoutingModule,
    ScrollToModule,
    FeatherModule.pick(icons)
  ]
})
export class LandingMModule { }
