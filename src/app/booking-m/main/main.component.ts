import { Component, OnInit } from '@angular/core';
import {PlatformService} from '../../services/platform/platform.service';
import {Platform} from '../../shared/platform';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  platforms$: Observable<Platform[]>;
  constructor(private platformService: PlatformService,
              private router: Router) { }

  ngOnInit(): void {
    this.platforms$ = this.platformService.fetchPlatforms();
  }


  gotoBooking(id: string) {
    this.router.navigate(['booking/new-booking', id]);
  }
}
