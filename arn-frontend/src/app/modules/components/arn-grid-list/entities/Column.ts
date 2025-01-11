import { Type } from '@angular/core';
import {ArnSearchSelectComponent} from '../../arn-search-select/arn-search-select.component';

export interface DataColumn {
  title: string;
  name: string;
  width?: number;
  template?: (dataItem: any) => string;
}

export interface ActionColumn {
  actionType: 'edit' | 'delete';
  actionCondition?: (dataItem: any) => boolean;
  width?: number;
}

export interface SelectColumn extends DataColumn {
  component: Type<ArnSearchSelectComponent>;
  options: SelectOption[];
  onSelectionChange: (selectedValue: string, dataItem: any, column: SelectColumn) => void;
}

export interface SelectOption {
  label: string;
  value: string;
}

export type Column = DataColumn | ActionColumn | SelectColumn;

export const ACTIONS = {
  EDIT: 'edit',
  DELETE: 'delete',
} as const;
