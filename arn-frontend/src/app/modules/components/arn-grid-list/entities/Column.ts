import { SelectOptions } from '../../arn-search-select/entities/SelectOptions';

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
  options: SelectOptions[];
  onSelectionChange: (selectedValue: string, dataItem: any, column: SelectColumn) => void;
  initialValue?: (dataItem: any) => SelectColumn;
}

export type Column = DataColumn | ActionColumn | SelectColumn;

export const ACTIONS = {
  EDIT: 'edit',
  DELETE: 'delete',
} as const;
