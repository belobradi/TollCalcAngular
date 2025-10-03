import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { MapSearchService } from '../services/map-search.service';

@Component({
  selector: 'app-map-search',
  standalone: true,
  templateUrl: './map-search.component.html'
})

export class MapSearchComponent implements AfterViewInit, OnDestroy {
  private startAddressSearcher!: MapSearchService;
  private endAddressSearcher!: MapSearchService;

  ngAfterViewInit(): void {
    this.startAddressSearcher = new MapSearchService('startAddress', 'startAddressDropdownSearch');
    this.endAddressSearcher = new MapSearchService('endAddress', 'endAddressDropdownSearch');
    
    this.setupAddressListeners();
  }

  ngOnDestroy(): void {
    this.startAddressSearcher?.destroy();
    this.endAddressSearcher?.destroy();
  }

  private setupAddressListeners(): void {
    const startAddressInput = document.getElementById('startAddress');
    const endAddressInput = document.getElementById('endAddress');

    startAddressInput?.addEventListener('addressSelected', (e: any) => {
      console.log('Start address selected:', e.detail);
      // Handle start address selection
    });

    endAddressInput?.addEventListener('addressSelected', (e: any) => {
      console.log('End address selected:', e.detail);
      // Handle end address selection
    });
  }
}