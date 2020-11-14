import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../../services/Auth/auth.service';
import {UserProfileService} from '../../services/user-profile/user-profile.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlatformConnectedGuard implements CanActivate {
  constructor(private ups: UserProfileService,
              private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentPlatform = route.params.id;
    return this.ups.connectedPlatforms$.pipe(
      map(
        (platforms) => {
          if (currentPlatform in platforms) { return true; }
          else { return this.router.createUrlTree(['']); }
        }
      )
    );
  }

}
