import { Component, EventEmitter, HostListener, Inject, OnInit, Output, ElementRef } from '@angular/core';

@Component({
  selector: 'app-arn-search-select',
  templateUrl: './arn-search-select.component.html',
  styleUrls: ['./arn-search-select.component.less']
})
export class ArnSearchSelectComponent implements OnInit {
  @Output() selectedOption = new EventEmitter<string>();

  searchQuery: string = '';
  filteredOptions: string[] = [];
  showDropdown: boolean = false;

  constructor(
    private elementRef: ElementRef,
    @Inject('options') public options: string[],
    @Inject('onSelectionChange') private onSelectionChange: (selectedValue: string) => void
  ) {}

  ngOnInit() {
    this.filteredOptions = [...this.options];
  }

  filterOptions() {
    this.filteredOptions = this.options.filter(option =>
      option.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  selectOption(option: string) {
    this.searchQuery = option;
    this.showDropdown = false;
    this.selectedOption.emit(option);
    this.onSelectionChange(option);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }
}
