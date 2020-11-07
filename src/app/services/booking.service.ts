import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private afStore: AngularFirestore) {
  }

  addNewBooking(bookingObject, uid): Promise<any> {
    return this.afStore.doc(`users/${uid}/bookings/${Date.now().toString()}`).set(bookingObject);
  }
}
