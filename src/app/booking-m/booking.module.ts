import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { MainComponent } from './main/main.component';
import {FlexModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { NewBookingComponent } from './new-booking/new-booking.component';
import {
  AgendaService,
  DayService,
  MonthAgendaService,
  MonthService,
  ScheduleModule, TimelineMonthService, TimelineViewsService,
  WeekService,
  WorkWeekService
} from '@syncfusion/ej2-angular-schedule';


@NgModule({
  declarations: [MainComponent, NewBookingComponent],
  imports: [
    CommonModule,
    BookingRoutingModule,
    FlexModule,
    MatCardModule,
    MatButtonModule,
    ScheduleModule
  ],
  providers: [DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    MonthAgendaService,
    TimelineViewsService,
    TimelineMonthService]
})
export class BookingModule { }
