import {AfterContentInit, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
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
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns'
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars'
import {ScheduleComponent} from '@syncfusion/ej2-angular-schedule';
import { L10n } from '@syncfusion/ej2-base'

L10n.load({
  'en-US': {
    'schedule': {
      'addTitle' : 'New Title',
      'saveButton' : 'Book Slots',
      'cancelButton' : 'Cancel Booking',
      'newEvent' : 'Add Booking Slots'
    }
  }
});



@Component({
  selector: 'app-new-booking',
  template: `<ejs-schedule height="850" width="1250" [eventSettings] = "eventObject" [currentView] = "setView" (popupOpen)='onPopupOpen($event)' [showQuickInfo]='showQuickInfo'>
    <ng-template #editorTemplate let-data>
      <table class="custom-event-editor" width="100%" cellpadding="5">
        <tbody>
            <tr>
              <td class="e-textlabel">Summary</td>
              <td colspan="4">
                // must have e-field and data-name="Form fields from Data Source"
                <input id="Subject" class="e-field e-input" type="text" value="{{data.Subject}}" data-name="Subject" style="width: 100%" />
              </td>
            </tr>
            <tr>
              <td class="e-textlabel">Status</td>
              <td colspan="4">
                <ejs-dropdownlist id='Status' class="e-field" data-name="Status" placeholder='Choose Status'
                                  [dataSource]='StatusData' [fields]='StatusFields' value='{{data.Status}}'>
                </ejs-dropdownlist>
              </td>
            </tr>
            <tr>
              <td class="e-textlabel">From</td>
              <td colspan="4">
                <ejs-datetimepicker id="StartTime" class="e-field" data-name="StartTime"
                                    format="M/dd/yy h:mm a" [value]="dateParser(data.startTime || data.StartTime)">
                </ejs-datetimepicker>
              </td>
            </tr>
            <tr>
              <td class="e-textlabel">To</td>
              <td colspan="4">
                <ejs-datetimepicker id="EndTime" class="e-field" data-name="EndTime" format="M/dd/yy h:mm a"
                                    [value]='dateParser(data.endTime || data.EndTime)'></ejs-datetimepicker>
              </td>
            </tr>
            <tr>
              <td class="e-textlabel">Reason</td>
              <td colspan="4">
                            <textarea id="Description" class="e-field e-input" name="Description" rows="3" cols="50"
                                      value="{{data.Description}}"
                                      style="width: 100%; height: 60px !important; resize: vertical"></textarea>
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

  constructor() { }
  title = 'my-scheduler-app';
  public dateParser(data: String){
    return new Date(data);
  }

  public StatusFields: Object = { text: 'StatusText', value: 'StatusText'};
  public StatusData: Object  = [
    { StatusText: 'New'},
    { StatusText: 'Requested'},
    { StatusText: 'Confirmed'}
  ]
  public setView: View = 'Week';
  public setDate: Date = new Date(2020, 10, 11);
  public showQuickInfo: Boolean = false;
  public eventObject: EventSettingsModel = {
    dataSource: [{
      Id: 1,
      Subject: "Meditation Time",
      StartTime: new Date(2020,10,11),
      EndTime: new Date(2020,10,11),
      Location: "At Yoga Center"
    }]
  }


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
      }
      // x.requestType can be eventChange or eventRemoved
    });
  }


}
