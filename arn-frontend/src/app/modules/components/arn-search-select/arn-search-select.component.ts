import { Component, EventEmitter, HostListener, OnInit, Output, ElementRef, Input } from '@angular/core';
import { SelectOptions } from './entities/SelectOptions';

@Component({
  selector: 'app-arn-search-select',
  templateUrl: './arn-search-select.component.html',
  styleUrls: ['./arn-search-select.component.less']
})
export class ArnSearchSelectComponent implements OnInit {
  @Output() selectedOption = new EventEmitter<SelectOptions>();
  @Output() optionsChange = new EventEmitter<SelectOptions[]>();
  @Input() options: SelectOptions[] = [];
  @Input() initialValue?: SelectOptions;

  searchQuery: string = '';
  filteredOptions: SelectOptions[] = [];
  showDropdown: boolean = false;
  private isInitializing: boolean = true;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.filteredOptions = this.options;

    if (this.initialValue) {
      this.isInitializing = true;
      this.selectOption(this.initialValue);
      this.isInitializing = false;
    }
  }

  filterOptions() {
    this.filteredOptions = this.options.filter(option =>
      option.label.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    if (!this.isInitializing) {
      this.optionsChange.emit(this.filteredOptions);
    }
  }

  selectOption(option: SelectOptions) {
    this.searchQuery = option.label;
    this.showDropdown = false;

    if (!this.isInitializing) {
      this.selectedOption.emit(option);
      this.optionsChange.emit([option]);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }
}
