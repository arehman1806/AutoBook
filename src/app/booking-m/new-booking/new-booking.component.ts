<<<<<<< HEAD
import {Component, OnInit, ViewChild} from '@angular/core';
import { ScheduleComponent, EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, View } from '@syncfusion/ej2-angular-schedule';
=======
import {AfterContentInit, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
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
>>>>>>> 386ffe6c2792fd7eca9b9fa6b71e8e3301af665b

@Component({
  selector: 'app-new-booking',
  providers: [DayService, WeekService, WorkWeekService, MonthService],
  template: `<button #addButton ejs-button id="addButton" type="button" content="Add" (click)="onButtonClick()"></button>
  <ejs-schedule #scheduleObj width='100%' height='520px' [selectedDate]="selectedDate" [eventSettings]="eventSettings" [views]="scheduleViews"></ejs-schedule>`,
  styleUrls: ['./new-booking.component.scss']
})
export class NewBookingComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
    }

  dateTodisplay = new Date(2020, 10, 11);
  newBookings = [];

  @ViewChild("scheduleObj")
  public scheduleObj: ScheduleComponent;
<<<<<<< HEAD
  @ViewChild("addButton")
  public selectedDate: Date = new Date(2018, 1, 15);
  public scheduleViews: View[] = ['Day', 'Week', 'WorkWeek', 'Month'];
  public eventSettings: EventSettingsModel = {
    dataSource: [{
      Id: 1,
      Subject: 'Testing',
      StartTime: new Date(2018, 1, 11, 9, 0),
      EndTime: new Date(2018, 1, 11, 10, 0),
      IsAllDay: false
    }, {
      Id: 2,
      Subject: 'Vacation',
      StartTime: new Date(2018, 1, 13, 9, 0),
      EndTime: new Date(2018, 1, 13, 10, 0),
      IsAllDay: false
    }]
  }
  public onButtonClick(): void {
    let data: Object[] = [{
      Id: 3,
      Subject: 'Conference',
      StartTime: new Date(2018, 1, 12, 9, 0),
      EndTime: new Date(2018, 1, 12, 10, 0),
      IsAllDay: true
    }, {
      Id: 4,
      Subject: 'Meeting',
      StartTime: new Date(2018, 1, 15, 10, 0),
      EndTime: new Date(2018, 1, 15, 11, 30),
      IsAllDay: false
    }];
    this.scheduleObj.addEvent(data);
  }
=======


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.scheduleObj.actionBegin.subscribe(x => {
      if (x.requestType === 'eventCreate') {
        this.newBookings.push(x.data[0]);
        console.log(this.newBookings);
      }
      // x.requestType can be eventChange or eventRemoved
    });
  }


>>>>>>> 386ffe6c2792fd7eca9b9fa6b71e8e3301af665b
}
