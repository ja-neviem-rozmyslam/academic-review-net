import {MenuItem} from '../../../components/sidemenu/MenuItem';
import {
  AcademicCapOutlineIconComponent,
  SquaresPlusOutlineIconComponent,
  UserPlusOutlineIconComponent,
  UsersOutlineIconComponent
} from '@dimaslz/ng-heroicons';

export const AdminMenu: MenuItem[] = [
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
    path: 'conference-management',
    title: 'Správa Konferencií',
    icon: SquaresPlusOutlineIconComponent
  },
  {
    path: 'university-management',
    title: 'Správa Univerzít',
    icon: AcademicCapOutlineIconComponent
  }
];
