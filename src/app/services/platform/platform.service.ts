import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Platform} from '../../shared/platform';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(private afStore: AngularFirestore) {}

  fetchPlatforms(): Observable<Platform[]> {
    return this.afStore.doc('platforms/platforms').get().pipe(
      map(
        (response) => {
          return response.data().platforms as Platform[];
        }
      )
    );
  }
}
