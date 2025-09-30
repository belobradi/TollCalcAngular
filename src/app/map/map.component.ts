import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet'; // Import Leaflet

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html'
})

export class MapComponent implements AfterViewInit {
  private map!: L.Map;
  showInfoText = true;

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  toggleInfoText(): void {
    this.showInfoText = !this.showInfoText;
  }

  private initMap(): void {
    this.map = L.map('map-container', { zoomControl: false }).setView([44.8, 20.5], 7);
    L.control.zoom({ position: 'bottomright' }).addTo(this.map);

    const tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
      className: 'map-tiles'
    }).addTo(this.map);

    tiles.on('tileerror', () => {
      // You can implement a more "Angular" way to show errors later,
      // like using a service or an @Output event emitter.
      console.error('Map tiles failed to load. Check internet or proxy settings.');
    });
  }
}
