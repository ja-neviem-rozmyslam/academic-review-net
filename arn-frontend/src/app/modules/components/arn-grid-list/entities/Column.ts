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

export type Column = DataColumn | ActionColumn;

export const ACTIONS = {
  EDIT: 'edit',
  DELETE: 'delete',
} as const;
