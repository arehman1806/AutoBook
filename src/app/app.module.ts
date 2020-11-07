import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {HttpClientModule} from '@angular/common/http';
import {FlexModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule} from '@angular-material-components/datetime-picker';
import { CalenderComponent } from './calender/calender.component';
import { ScheduleModule, RecurrenceEditorModule } from '@syncfusion/ej2-angular-schedule';
import {AngularFireModule} from '@angular/fire';
import { environment } from 'environments/environment';
import {MatCardModule} from '@angular/material/card';
import { MakeANewBookingComponent } from './make-a-new-booking/make-a-new-booking.component';
import { MakeANew0bookingComponent } from './make-a-new0booking/make-a-new0booking.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CalenderComponent,
    MakeANewBookingComponent,
    MakeANew0bookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    FlexModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRippleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    ScheduleModule, RecurrenceEditorModule,
    AngularFireModule.initializeApp({apiKey: 'AIzaSyBlfZNxYxqOrS7HrVJBK9kfCezS6r4-1Qo',
      authDomain: 'autobook-e740b.firebaseapp.com',
      databaseURL: 'https://autobook-e740b.firebaseio.com',
      projectId: 'autobook-e740b',
      storageBucket: 'autobook-e740b.appspot.com',
      messagingSenderId: '919990050610',
      appId: '1:919990050610:web:e6c56f256a75aeccd2412b'}),
    MatCardModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
