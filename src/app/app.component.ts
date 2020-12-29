import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';
import {NavButtons} from './shared/NavButtons';
import {NavButton} from './shared/NavButton';
import {AuthService} from './services/Auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AutoBook';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  navButtons: NavButton[] = NavButtons;
  constructor(private http: HttpClient,
              private breakpointObserver: BreakpointObserver,
              public auth: AuthService) {
  }
}

