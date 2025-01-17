import { Component, EventEmitter, HostListener, OnInit, Output, ElementRef, Input, ViewChild } from '@angular/core';
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

  @ViewChild('dropdownInput') dropdownInput!: ElementRef;

  searchQuery: string = '';
  filteredOptions: SelectOptions[] = [];
  showDropdown: boolean = false;

  dropdownPosition = { top: 0, left: 0, width: 0 };
  highlightedIndex: number = -1; // Index of the currently highlighted option
  private isInitializing: boolean = true;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.filteredOptions = this.options;

    if (this.initialValue) {
      this.isInitializing = true;
      this.selectOption(this.initialValue, false);
      this.isInitializing = false;
    }
  }

  filterOptions() {
    this.filteredOptions = this.options.filter(option =>
      option.label.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    this.optionsChange.emit(this.filteredOptions);
    this.updateDropdownPosition();
    this.highlightedIndex = -1;
  }

  selectOption(option: SelectOptions, emitEvent: boolean = true) {
    this.searchQuery = option.label;
    this.showDropdown = false;

    if (emitEvent) {
      this.selectedOption.emit(option);
    }
  }

  updateDropdownPosition() {
    const rect = this.dropdownInput.nativeElement.getBoundingClientRect();

    this.dropdownPosition = {
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
    };
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.showDropdown) {
      if (event.key === 'ArrowDown') {
        this.highlightedIndex = Math.min(this.highlightedIndex + 1, this.filteredOptions.length - 1);
        event.preventDefault();
      } else if (event.key === 'ArrowUp') {
        this.highlightedIndex = Math.max(this.highlightedIndex - 1, -1);
        event.preventDefault();
      } else if (event.key === 'Enter') {
        if (this.highlightedIndex >= 0 && this.highlightedIndex < this.filteredOptions.length) {
          this.selectOption(this.filteredOptions[this.highlightedIndex]);
        }
        event.preventDefault();
      }
    }
  }

  isHighlighted(index: number): boolean {
    return this.highlightedIndex === index;
  }
}
