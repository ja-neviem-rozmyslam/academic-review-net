import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ACTIONS, Column, DataColumn} from './entities/Column';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-arn-grid-list',
  templateUrl: './arn-grid-list.component.html',
  styleUrls: ['./arn-grid-list.component.less']
})
export class ArnGridListComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() columns: Column[] = [];
  @Input() searchMethod: (searchObject: any, sortOptions: { column: string; direction: 'asc' | 'desc' }) => Observable<any>;
  @Input() searchObject: any = {};
  @Input() initialRefresh: boolean = false;

  @Output() editAction = new EventEmitter<any>();
  @Output() deleteAction = new EventEmitter<any>();
  @Output() doubleClickAction = new EventEmitter<any>();

  currentSort: { column: string; direction: 'asc' | 'desc' } = {column: '', direction: 'asc'};

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    if (this.initialRefresh) {
      this.refreshGrid();
    }
  }

  refreshGrid(): void {
    if (this.searchMethod) {
      const result = this.searchMethod(this.searchObject, this.currentSort);
      if (result instanceof Observable) {
        console.log(result);
        result.subscribe(
          data => {
            this.data = data;
            this.cdr.detectChanges();
          },
          error => {
            console.error('Error fetching data:', error);
          }
        );
      } else {
        console.error('searchMethod did not return an Observable');
      }
    }
  }

  calculateWidth(column: DataColumn): number {
    const totalWidth = this.columns
      .filter((col): col is DataColumn => 'width' in col)
      .reduce((sum, col) => sum + (col.width || 1), 0);
    return ((column.width || 1) / totalWidth) * 100;
  }

  toggleSort(column: Column): void {
    if (!this.isDataColumn(column)) return;

    if (this.currentSort.column === column.name) {
      this.currentSort.direction = this.currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSort = {column: column.name, direction: 'desc'};
    }
    this.refreshGrid();
  }

  handleAction(actionType: 'edit' | 'delete', dataItem: any): void {
    if (actionType === ACTIONS.EDIT) {
      this.editAction.emit(dataItem);
    } else if (actionType === ACTIONS.DELETE) {
      this.deleteAction.emit(dataItem);
    }
  }

  onDoubleClick(dataItem: any): void {
    this.doubleClickAction.emit(dataItem);
  }

  isDataColumn(column: Column): column is DataColumn {
    return 'name' in column;
  }

  protected readonly ACTIONS = ACTIONS;
}
