import {
  ClipboardDocumentListOutlineIconComponent,
  PresentationChartBarOutlineIconComponent,
  UserOutlineIconComponent
} from '@dimaslz/ng-heroicons';
import {MenuItem} from '../../../components/sidemenu/MenuItem';

export const MENU_ITEMS: MenuItem[] = [
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
    subItems: [
      {
        path: '',
        title: 'Moje Aktívne Práce',
      },
      {
        path: '',
        title: 'Moje Dokončené Práce',
      }
    ],
  },
];
