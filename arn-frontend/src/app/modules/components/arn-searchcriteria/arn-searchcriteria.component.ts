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

  onSearch(): void {
    this.search.emit();
  }
}
