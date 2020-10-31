import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public bookingForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      uid: [''],
      password: [''],
      date: ['']
    });
  }


  onSubmit($event: Event) {
    const uid = this.bookingForm.value.uid;
    const password = this.bookingForm.value.password;
    const x = this.bookingForm.value.date as Date;
    const day = x.getDay();
    console.log(x);
    const month = x.getMonth();
    const time = x.getHours() + (x.getMinutes() / 6000 ) * 100;
    const url = `http://127.0.0.1:5000/?uid=${uid}&password=${password}&day=${day}&month=${month}&time=${time}`;
    window.alert('You are being redirected to ' + url);
    this.http.get(url).subscribe(x => {console.log(x); }, y => {console.log(y); });
    window.alert('you should have been redirected');
  }
}
