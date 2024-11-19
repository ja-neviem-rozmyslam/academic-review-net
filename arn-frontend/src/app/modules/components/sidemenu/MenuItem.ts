export interface MenuItem {
  path: string;
  title: string;
  icon: any;
  subItems?: MenuSubItem[];
}

export interface MenuSubItem {
  path: string;
  title: string;
}
