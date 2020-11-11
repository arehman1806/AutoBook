import {AfterContentChecked, AfterContentInit, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {
  View,
  AgendaService,
  DayService,
  MonthAgendaService,
  MonthService, TimelineMonthService,
  TimelineViewsService,
  WeekService,
  WorkWeekService,
  EventSettingsModel,
  PopupOpenEventArgs
} from '@syncfusion/ej2-angular-schedule';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import {ScheduleComponent} from '@syncfusion/ej2-angular-schedule';
import { L10n } from '@syncfusion/ej2-base';
import {AuthService} from '../../services/Auth/auth.service';
import {BookingService} from '../../services/booking.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';

L10n.load({
  'en-US': {
    schedule: {
      addTitle : 'New Title',
      saveButton : 'Book Slots',
      cancelButton : 'Cancel Booking',
      newEvent : 'Add Booking Slots'
    }
  }
});



@Component({
  selector: 'app-new-booking',
  template: `<ejs-schedule #scheduleObj height="850" width="1250" [eventSettings] = "eventObject" [currentView] = "setView" [showQuickInfo]='showQuickInfo'  (popupOpen)='onPopupOpen($event)'>
    <ng-template #editorTemplate let-data>
      <table class="custom-event-editor" width="100%" cellpadding="5">
        <tbody>
            <tr>
              <td class="e-textlabel">Site</td>
              <td colspan="4">
                <ejs-dropdownlist id='Site' class="e-field" data-name="Site" placeholder='Choose Site'
                                  [dataSource]='SiteData' [fields]='SiteFields' value='{{data.Site}}'>
                </ejs-dropdownlist>
              </td>
            </tr>
            <tr>
              <td class="e-textlabel">Activity</td>
              <td colspan="4">
                <ejs-dropdownlist id='Activity' class="e-field" data-name="Activity" placeholder='Choose Acitivity'
                                  [dataSource]='ActivityData' [fields]='ActivityFields' value='{{data.Activity}}'>
                </ejs-dropdownlist>
              </td>
            </tr>
            <tr>
              <td class="e-textlabel">From</td>
              <td colspan="4">
                <ejs-datetimepicker id="StartTime" class="e-field" data-name="StartTime"
                                    format="dd/M/yy h:mm a" [value]="dateParser(data.startTime || data.StartTime)">
                </ejs-datetimepicker>
              </td>
            </tr>
            <tr>
              <td class="e-textlabel">To</td>
              <td colspan="4">
                <ejs-datetimepicker id="EndTime" class="e-field" data-name="EndTime" format="M/dd/yy h:mm a"
                                    [value]='dateParser(data.endTime || data.EndTime)'></ejs-datetimepicker>
              </td>
<!--            </tr>-->
<!--            <tr>-->
<!--              <td class="e-textlabel">Reason</td>-->
<!--              <td colspan="4">-->
<!--                            <textarea id="Description" class="e-field e-input" name="Description" rows="3" cols="50"-->
<!--                                      value="{{data.Description}}"-->
<!--                                      style="width: 100%; height: 60px !important; resize: vertical"></textarea>-->
<!--              </td>-->
<!--            </tr>-->
            <tr>
              <td class="e-textlabel">Duration</td>
              <td colspan="4">
                <ejs-dropdownlist id='Duration' class="e-field" data-name="Duration" placeholder='Choose Arrival Window Duration'
                                  [dataSource]='DurationData' [fields]='DurationFields' value='{{data.Duration}}'>
                </ejs-dropdownlist>
              </td>
            </tr>
        </tbody>
      </table>

    </ng-template>

    </ejs-schedule>`,
  // templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.scss']
})
export class NewBookingComponent implements OnInit, AfterViewInit {
  public fetchedBookings: any[];

  constructor(private auth: AuthService,
              private bookingService: BookingService,
              private afAuth: AngularFireAuth,
              private afStore: AngularFirestore) {
  }
  title = 'my-scheduler-app';

  SiteFields: object = { text: 'SiteText', value: 'SiteText'};
  SiteData: object  = [
    { SiteText: 'Easter Bush'},
    { SiteText: 'Pleasance Sports Centre'}
  ];

  ActivityFields: object = { text: 'ActivityText', value: 'ActivityText'};
  ActivityData: object  = [
    { ActivityText: 'Gym Access'},
    { ActivityText: 'Climbing'},
    { ActivityText: 'Lane Swimming'}
  ];

  DurationFields: object = { text: 'DurationText', value: 'DurationText'};
  DurationData: object  = [
    { DurationText: '30 minutes'}
  ];


  setView: View = 'Week';
  setDate: Date = new Date(2020, 10, 11);
  showQuickInfo = true;
  eventObject: EventSettingsModel = {
    dataSource: []
  };


  newBookings = [];
  loading = true;

  @ViewChild('scheduleObj')
  scheduleObj: ScheduleComponent;
  dateParser(data: string): any{
    return new Date(data);
  }


  ngOnInit(): void {

    this.afAuth.user.subscribe(
      (user) => {
        if (user) {
          this.afStore.collection(`users/${user.uid}/bookings`).get().subscribe(
            (resp) => {
              const bookingsFetched = [];
              resp.forEach(
                (document) => {
                  const x = document.data();
                  const endTime = x.EndTime.seconds.toString() + '000';
                  const srtTime = x.StartTime.seconds.toString() + '000';
                  x.StartTime = new Date(parseInt(srtTime));
                  x.EndTime = new Date(parseInt(endTime));
                  bookingsFetched.push(x);
                }
              );
              this.scheduleObj.eventSettings.dataSource = bookingsFetched;
              this.fetchedBookings = bookingsFetched;
              this.loading = false;
            }
          );
        }
      }
    );

  }



  ngAfterViewInit(): void {
    this.scheduleObj.actionBegin.subscribe(x => {
      if (x.requestType === 'eventCreate') {
        this.newBookings.push(x.data[0]);
        this.auth.user$.subscribe(
          (user) => {
            if (user) {
              delete x.data[0].RecurrenceRule;
              console.log(x.data[0]);
              this.bookingService.addNewBooking(x.data[0], user.uid);
            }
          }
        );
      }
      // x.requestType can be eventChange or eventRemoved
    });
  }

  public onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'QuickInfo') {
      // @ts-ignore
      const dialogObj = args.element.ej2_instances[0];
      dialogObj.hide();
      const currentAction = args.target.classList.contains('e-work-cells') ? 'Add' : 'Save';
      this.scheduleObj.openEditor(args.data, currentAction);
    }
  }

}
