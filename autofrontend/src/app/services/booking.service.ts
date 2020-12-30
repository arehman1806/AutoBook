import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private afStore: AngularFirestore,
              private afAuth: AngularFireAuth) {


    }

  addNewBooking(bookingObject, uid, docID): Promise<void> {
    return this.afStore.doc(`users/${uid}/bookings/${docID}`).set(bookingObject).then(
    );
  }


  removeBooking(uid: string, docID: number): Promise<void> {
    return this.afStore.doc(`users/${uid}/bookings/${docID}`).delete();
  }
}
