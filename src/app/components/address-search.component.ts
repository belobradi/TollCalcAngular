import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { AddressSearchService } from '../services/address-search.service';

@Component({
  selector: 'app-map-search',
  standalone: true,
  templateUrl: './address-search.component.html'
})

export class AddressSearchComponent implements AfterViewInit, OnDestroy {
  private startAddressSearcher!: AddressSearchService;
  private endAddressSearcher!: AddressSearchService;

  ngAfterViewInit(): void {
    this.startAddressSearcher = new AddressSearchService('startAddress', 'startAddressDropdownSearch');
    this.endAddressSearcher = new AddressSearchService('endAddress', 'endAddressDropdownSearch');
    
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