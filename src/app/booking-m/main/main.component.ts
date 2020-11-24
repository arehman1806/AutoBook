import { Component, OnInit } from '@angular/core';
import {PlatformService} from '../../services/platform/platform.service';
import {Platform} from '../../shared/platform';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {UserProfileService} from '../../services/user-profile/user-profile.service';
import {MatDialog} from '@angular/material/dialog';
import {NewPlatformComponent} from '../new-platform/new-platform.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  platforms$: Observable<Platform[]>;
  connectedPlatforms$: Observable<string[]>;

  constructor(private platformService: PlatformService,
              private router: Router,
              private ups: UserProfileService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.platforms$ = this.platformService.fetchPlatforms();
    this.connectedPlatforms$ = this.ups.connectedPlatforms$;
  }


  // tslint:disable-next-line:typedef
  gotoBooking(id: string) {
    this.router.navigate(['booking/new-booking', id]);
  }


  isConnected(platform: Platform, connectedPlatforms: string[]): boolean {
    return connectedPlatforms.includes(platform.id);
  }

  // tslint:disable-next-line:typedef
  isNotConnected(platform: Platform, connectedPlatforms: string[]) {
    return !connectedPlatforms.includes(platform.id);
  }

  // tslint:disable-next-line:typedef
  connectANewPlatform(id: string, name: string) {
    const dialogRef = this.dialog.open(NewPlatformComponent, {
      width: '50%',
      data: {platformID: id, platformName: name}
    });
    dialogRef.afterClosed().subscribe((x) => {
      if (x.successful) { window.alert('connected'); }
      else {window.alert('not connected'); }
    });
  }
}
