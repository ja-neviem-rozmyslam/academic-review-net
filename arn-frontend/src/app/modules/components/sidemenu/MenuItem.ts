export interface MenuItem {
  path: string;
  title: string;
  icon: any;
  queryParams?: any;
  subItems?: MenuSubItem[];
}

export interface MenuSubItem {
  path: string;
  title: string;
  queryParams?: any;
}
