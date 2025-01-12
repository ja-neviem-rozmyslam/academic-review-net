import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Column, DataColumn, ACTIONS} from './entities/Column';
import { Observable } from 'rxjs';

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
  @Input() sortable: boolean;
  @Input() initialSort: string;
  @Input() initialRefresh: boolean = false;
  @Input() addPlusButton: boolean = false;

  @Output() editAction = new EventEmitter<any>();
  @Output() deleteAction = new EventEmitter<any>();
  @Output() doubleClickAction = new EventEmitter<any>();
  @Output() plusButtonAction = new EventEmitter<void>();

  currentSort: { column: string; direction: 'asc' | 'desc' } = { column: '', direction: 'asc' };


  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.sortable && this.initialSort) {
      this.currentSort = { column: this.initialSort, direction: 'asc' };
    }
    if (this.initialRefresh) {
      this.refreshGrid();
    }
  }

  refreshGrid(): void {
    if (this.searchMethod) {
      this.searchMethod(this.searchObject, this.currentSort).subscribe((data) => {
        if (!data) return;
        this.data = data;
        this.cdr.detectChanges();
      });
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
      this.currentSort = { column: column.name, direction: 'asc' };
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
