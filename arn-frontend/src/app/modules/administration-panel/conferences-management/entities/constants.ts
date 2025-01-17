import {TabOption} from '../../../components/tabs/entities/TabOption';
import {SelectOption} from '../../../components/arn-select/entities/SelectOption';

export const EDIT = 'EDIT';
export const ASSIGN = 'ASSIGN';

export const REVIEW_FORM_TEXT = 'Komentár';
export const REVIEW_FORM_SELECT = 'Známka';

export const TABOPTIONS: TabOption[] = [
  { value: EDIT, label: 'Upraviť konferenciu', hidden: false},
  { value: ASSIGN, label: 'Práce študentov', hidden: false},
];

export const CONFERENCE_CLOSED_OPTIONS: SelectOption[] = [
  { value: false, display: 'Aktívna' },
  { value: true, display: 'Ukončená' }
];

export const REVIEW_FORM_OPTIONS: SelectOption[] = [
  { value: REVIEW_FORM_TEXT, display: REVIEW_FORM_TEXT },
  { value: REVIEW_FORM_SELECT, display: REVIEW_FORM_SELECT }
];
