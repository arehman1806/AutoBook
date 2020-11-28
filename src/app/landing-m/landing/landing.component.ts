import { Component, OnInit } from '@angular/core';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to'

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['../style.scss']
})
export class LandingComponent implements OnInit {

  currentSection = 'home';

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Window scroll method
   */
  // tslint:disable-next-line:typedef
  windowScroll() {
    const navbar = document.getElementById('navbar');
    if (document.body.scrollTop >= 50 || document.documentElement.scrollTop > 50) {
      navbar.classList.add('nav-sticky');
    } else {
      navbar.classList.remove('nav-sticky');
    }
  }

  /**
   * Section changed method
   * @param sectionId specify the current sectionID
   */
  // tslint:disable-next-line:typedef
  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }

  /**
   * Toggle navbar
   */
  // tslint:disable-next-line:typedef
  toggleMenu() {
    document.getElementById('navbarCollapse').classList.toggle('show');
  }

}
