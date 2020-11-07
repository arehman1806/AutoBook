import {Component, OnInit, ViewChild} from '@angular/core';
import {
  AgendaService,
  DayService,
  MonthAgendaService,
  MonthService, TimelineMonthService,
  TimelineViewsService,
  WeekService,
  WorkWeekService
} from '@syncfusion/ej2-angular-schedule';
import {$e} from 'codelyzer/angular/styles/chars';
import {ScheduleComponent} from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.scss']
})
export class NewBookingComponent implements OnInit {

  constructor() { }

  dateTodisplay = new Date(2020, 10, 11);
  newBookings = [];

  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;

  ngOnInit(): void {

  }

  afterContentInit(): void {
    this.scheduleObj.eventRendered.subscribe(x => {console.log(x); });
  }

}
