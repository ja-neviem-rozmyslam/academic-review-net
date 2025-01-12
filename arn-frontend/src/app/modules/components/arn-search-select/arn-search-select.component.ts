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

  searchQuery: string = '';
  filteredOptions: SelectOptions[] = [];
  showDropdown: boolean = false;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.filteredOptions = this.options;
  }

  filterOptions() {
    this.filteredOptions = this.options.filter(option =>
        option.label.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.optionsChange.emit(this.filteredOptions);
  }

  selectOption(option: SelectOptions) {
    this.searchQuery = option.label;
    this.showDropdown = false;
    this.selectedOption.emit(option);
    this.optionsChange.emit([option]);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }
}
