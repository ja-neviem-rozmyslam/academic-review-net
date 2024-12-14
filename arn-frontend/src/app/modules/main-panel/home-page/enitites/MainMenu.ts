import {
  ClipboardDocumentListOutlineIconComponent,
  PresentationChartBarOutlineIconComponent,
  UserOutlineIconComponent
} from '@dimaslz/ng-heroicons';
import {MenuItem} from '../../../components/sidemenu/MenuItem';
import {UserRoles} from '../../../constants';

export function getMenuItems(userRoles: string[]): MenuItem[] {
  const menuItems: MenuItem[] = [
    {
      path: 'profile',
      title: 'Profil',
      icon: UserOutlineIconComponent,
    },
    {
      path: 'conferences',
      title: 'Konferencie',
      icon: PresentationChartBarOutlineIconComponent,
    },
    {
      path: 'theses',
      title: 'Moje práce',
      icon: ClipboardDocumentListOutlineIconComponent,
      subItems: [],
    },
  ];

  const thesesMenuItem = menuItems.find(item => item.path === 'theses');

  if (userRoles.includes(UserRoles.STUDENT)) {
    thesesMenuItem.subItems.push(
      {
        path: '',
        title: 'Moje Aktívne Práce',
      },
      {
        path: '',
        title: 'Moje Dokončené Práce',
      }
    );
  }

  if (userRoles.includes(UserRoles.REVIEWER)) {
    thesesMenuItem.subItems.push(
      {
        path: '',
        title: 'Moje Pridelené Práce',
      },
      {
        path: '',
        title: 'Moje Posúdené Práce',
      }
    );
  }

  return menuItems;
}
