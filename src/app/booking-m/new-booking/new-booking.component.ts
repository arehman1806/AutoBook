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
import {AuthService} from '../../services/Auth/auth.service';
import {BookingService} from '../../services/booking.service';

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.scss']
})
export class NewBookingComponent implements OnInit, AfterViewInit {

  constructor(private auth: AuthService,
              private bookingService: BookingService) { }

  dateTodisplay = new Date(2020, 10, 11);
  newBookings = [];

  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;


  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
    this.scheduleObj.actionBegin.subscribe(x => {
      if (x.requestType === 'eventCreate') {
        this.newBookings.push(x.data[0]);
        console.log(this.newBookings);
        this.auth.user$.subscribe(
          (user) => {
            if (user) {
              this.bookingService.addNewBooking(x.data[0], user.uid);
            }
          }
        );
      }
      // x.requestType can be eventChange or eventRemoved
    });
  }


}
