import { Component, signal, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MapComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  protected readonly title = signal('TollCalcAngular');
  mainContainer = {};
  narrowSidebar = {};
  calcSidebar = {};
  content = {};

  constructor(private readonly breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.breakpointObserver.observe(['(min-width: 1000px)'])
      .subscribe(result => {
        const isMobile: boolean = !result.matches;
        const isDesktop: boolean = result.matches;

        this.mainContainer = {
          'd-flex': true,
          'vh-100': true
        };
        this.narrowSidebar = {
          'd-flex': true,
          'flex-column': true,
          'bg-body-tertiary': true,
          'd-none': isMobile
        };
        this.content = {
          'd-flex': true,
          'flex-row': isDesktop,
          'flex-column': isMobile,
          'flex-grow-1': true,
          'flex-column-reverse': isMobile
        };
        this.calcSidebar = {
          'position-relative': true,
          'tw-h-64': isMobile,
          'tw-min-w-[410px]': true
        };
      });
  }
}