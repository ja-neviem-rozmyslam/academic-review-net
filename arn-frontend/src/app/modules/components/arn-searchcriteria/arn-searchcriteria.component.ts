import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-arn-searchcriteria',
  templateUrl: './arn-searchcriteria.component.html',
  styleUrl: './arn-searchcriteria.component.less'
})
export class ArnSearchcriteriaComponent {
  @Output() clearSearch = new EventEmitter<void>();
  @Output() search = new EventEmitter<void>();

  onClear(): void {
    this.clearSearch.emit();
  }

  handleKeydown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    if (event.key === 'Enter' && target.tagName.toLowerCase() === 'input') {
      this.onSearch();
    }
  }

  onSearch(): void {
    this.search.emit();
  }
}
