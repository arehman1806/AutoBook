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
import {DropDownListModule} from "@syncfusion/ej2-angular-dropdowns";
import {DateTimePickerModule} from "@syncfusion/ej2-angular-calendars";
import { NewPlatformComponent } from './new-platform/new-platform.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinner, MatProgressSpinnerModule, MatSpinner} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [MainComponent, NewBookingComponent, NewPlatformComponent],
  imports: [
    CommonModule,
    BookingRoutingModule,
    FlexModule,
    MatCardModule,
    MatButtonModule,
    ScheduleModule,
    DropDownListModule,
    DateTimePickerModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressSpinnerModule
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
