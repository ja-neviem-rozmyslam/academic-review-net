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
        path: 'my-theses',
        title: 'Moje Aktívne Práce',
      },
      {
        path: 'my-theses',
        queryParams: {closed: 'true'},
        title: 'Moje Dokončené Práce',
      }
    );
  }

  if (userRoles.includes(UserRoles.REVIEWER)) {
    thesesMenuItem.subItems.push(
      {
        path: 'my-theses',
        queryParams: {type: 'review'},
        title: 'Moje Pridelené Práce',
      },
      {
        path: 'my-theses',
        queryParams: {type: 'review' , closed: 'true'},
        title: 'Moje Posúdené Práce',
      }
    );
  }

  return menuItems;
}
