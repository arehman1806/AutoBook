import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailVerifiedGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.afAuth.user.pipe(
      map((user) => {
        if (user && user.emailVerified) {
          return true;
        }
        else {
          return this.router.createUrlTree(['verify-email']);
        }
      })
    );
  }

}
