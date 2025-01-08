import {TabOption} from '../../../../components/tabs/entities/TabOption';

export const EDIT = 'EDIT';
export const ASSIGN = 'ASSIGN';
export const SUBMISSION = 'SUBMISSION';

export const TABOPTIONS: TabOption[] = [
  { value: EDIT, label: 'Upraviť konferenciu', disabled: false},
  { value: ASSIGN, label: 'Priradiť reviewera', disabled: false},
  { value: SUBMISSION, label: 'Práce študentov', disabled: false},

];
