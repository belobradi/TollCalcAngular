import { Component, signal, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { MapComponent } from './components/map.component';
import { AddressSearchComponent } from './components/address-search.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MapComponent,
    AddressSearchComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  protected readonly title = signal('TollCalcAngular');
  appContainer = {};
  mainSidebar = {};
  calcSidebar = {};
  content = {};

  isDesktop = false;

  constructor(private readonly breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.breakpointObserver.observe(['(min-width: 1000px)'])
      .subscribe(result => {
        this.isDesktop = result.matches;
        const isMobile = !this.isDesktop;
        
        this.appContainer = {
          'd-flex': true,
          'flex-column-reverse': isMobile,
          'vh-100': true,
          'vw-100': true
        };
        this.mainSidebar = {
          'd-flex': true,
          'flex-column': true,
          'bg-body-tertiary': true,
          'd-none': isMobile,
          'tw-z-[9999]': true
        };
        this.calcSidebar = {
          'position-relative': true,
          'tw-min-w-[400px]': this.isDesktop
        };
      });
  }
}