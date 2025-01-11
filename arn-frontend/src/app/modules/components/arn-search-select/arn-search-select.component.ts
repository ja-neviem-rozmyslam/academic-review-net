import {Component, Input, Output, EventEmitter, OnInit, HostListener, ElementRef} from '@angular/core';

@Component({
  selector: 'app-arn-search-select',
  templateUrl: './arn-search-select.component.html',
  styleUrl: './arn-search-select.component.less'
})
export class ArnSearchSelectComponent implements OnInit {
  @Input() options: string[] = [];
  @Output() selectedOption = new EventEmitter<string>();

  searchQuery: string = '';
  filteredOptions: string[] = [];
  showDropdown: boolean = false;

  constructor(private elementRef: ElementRef) {}

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
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }
}
