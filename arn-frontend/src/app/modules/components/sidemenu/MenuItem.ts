export interface MenuItem {
  path: string;
  title: string;
  icon: string;
  subItems?: MenuSubItem[];
}

export interface MenuSubItem {
  path: string;
  title: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    path: 'domain-management',
    title: 'Domain Management',
    icon: 'fa fa-cogs',
  },
  {
    path: 'user-management',
    title: 'User Management',
    icon: 'fa fa-users',
    subItems: [
      {
        path: 'users',
        title: 'Users',
      },
      {
        path: 'roles',
        title: 'Roles',
      },
    ],
  },
  {
    path: 'user-mfsmf',
    title: 'Something else',
    icon: 'fa fa-users',
    subItems: [
      {
        path: 'users',
        title: 'Users',
      }
    ],
  },
];
