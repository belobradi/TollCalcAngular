import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet'; // Import Leaflet

@Component({
  selector: 'app-map',
  standalone: true,
  template: `<div id="map-container" class="w-100 h-100"></div>`
})

export class MapComponent implements AfterViewInit {
  private map!: L.Map;

  constructor() { }

  // Use AfterViewInit to ensure the <div id="map-container"> is in the DOM
  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    // Initialize the map on the 'map-container' div
    this.map = L.map('map-container', { zoomControl: false }).setView([44.8, 20.5], 7);
    L.control.zoom({ position: 'bottomright' }).addTo(this.map);

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    tiles.on('tileerror', () => {
      // You can implement a more "Angular" way to show errors later,
      // like using a service or an @Output event emitter.
      console.error('Map tiles failed to load. Check internet or proxy settings.');
    });
  }
}
