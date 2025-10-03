interface SearchResult {
  display_name: string;
  lat: string;
  lon: string;
}

export class AddressSearchService {
  private readonly input: HTMLInputElement;
  private readonly dropdown: HTMLElement;
  private searchResults: SearchResult[] = [];
  private debounceTimeout: any;

  constructor(inputId: string, dropdownId: string) {
    const input = document.getElementById(inputId) as HTMLInputElement;
    const dropdown = document.getElementById(dropdownId) as HTMLElement;

    if (!input || !dropdown) {
      throw new Error(`Search elements not found: #${inputId} or #${dropdownId}`);
    }

    this.input = input;
    this.dropdown = dropdown;
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.input.addEventListener('input', this.handleInput);
    this.dropdown.addEventListener('click', this.handleDropdownClick);
    document.addEventListener('click', this.handleDocumentClick);
  }
  
  private readonly handleInput = (e: Event): void => {
    clearTimeout(this.debounceTimeout);
    const query = (e.target as HTMLInputElement).value.trim();
    
    if (query.length < 2) {
      this.hideDropdown();
      return;
    }

    this.debounceTimeout = setTimeout(async () => {
      await this.setSearchResults(query);
      this.renderResults();
      this.showDropdown();
    }, 300);
  }

  private async setSearchResults(query: string): Promise<void> {
    try {
      const response = await fetch(
        `/api/search?format=json&q=${encodeURIComponent(query)}&limit=5`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      this.searchResults = await response.json();
    } catch (error) {
      this.searchResults = [];
      this.hideDropdown();
      console.error('Search error:', error);
    }
  }

  private readonly handleDropdownClick = (e: MouseEvent): void => {
    const clickedItem = (e.target as HTMLElement).closest('.dropdown-item');
    if (clickedItem) {
      const index = parseInt(clickedItem.getAttribute('data-index') || '-1');
      if (index >= 0) {
        this.selectResult(this.searchResults[index]);
      }
    }
  }

  private selectResult(result: SearchResult): void {
    this.input.value = result.display_name;
    this.hideDropdown();
    
    this.input.dispatchEvent(new CustomEvent('addressSelected', { 
      detail: result,
      bubbles: true
    }));
  }

  private readonly handleDocumentClick = (e: MouseEvent): void => {
    const isClickInside = this.input.contains(e.target as Node) || this.dropdown.contains(e.target as Node);
    if (!isClickInside) {
      this.hideDropdown();
    }
  }

  private renderResults(): void {
    if (!this.searchResults || this.searchResults.length === 0) {
      this.dropdown.innerHTML = '<div class="dropdown-item-text text-muted">Nema rezultata</div>';
      return;
    }

    this.dropdown.innerHTML = this.searchResults.map((result, index) => `
      <div class="dropdown-item" role="button" data-index="${index}">
          <div class="fw-medium text-truncate">${result.display_name}</div>
      </div>
    `).join('');
  }

  private showDropdown(): void {
    this.dropdown.classList.add('d-block');
    this.dropdown.classList.remove('d-none');
  }

  private hideDropdown(): void {
    this.dropdown.classList.add('d-none');
    this.dropdown.classList.remove('d-block');
  }

  public destroy(): void {
    this.input.removeEventListener('input', this.handleInput);
    this.dropdown.removeEventListener('click', this.handleDropdownClick);
    document.removeEventListener('click', this.handleDocumentClick);
  }
}