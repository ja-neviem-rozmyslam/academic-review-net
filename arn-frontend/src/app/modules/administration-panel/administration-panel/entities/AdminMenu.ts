import {MenuItem} from '../../../components/sidemenu/MenuItem';
import {
  AcademicCapOutlineIconComponent,
  SquaresPlusOutlineIconComponent,
  UserPlusOutlineIconComponent,
  UsersOutlineIconComponent
} from '@dimaslz/ng-heroicons';

export const AdminMenu: MenuItem[] = [
  {
    path: 'conference-management',
    title: 'Správa Konferencií',
    icon: SquaresPlusOutlineIconComponent
  },
  {
    path: 'user-management',
    title: 'Správa Používateľov',
    icon: UsersOutlineIconComponent
  },
  {
    path: 'admin-management',
    title: 'Správa Administrátorov',
    icon: UserPlusOutlineIconComponent
  },
  {
    path: 'university-management',
    title: 'Správa Univerzít',
    icon: AcademicCapOutlineIconComponent
  }
];
