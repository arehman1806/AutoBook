import { Component, OnInit } from '@angular/core';
import {
  AgendaService,
  DayService, MonthAgendaService, MonthService,
  TimelineMonthService,
  TimelineViewsService, WeekService,
  WorkWeekService
} from "@syncfusion/ej2-angular-schedule";

@Component({
  selector: 'app-calender',
  template: `<ejs-schedule> </ejs-schedule>`,
  // templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService]
})
export class CalenderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}


