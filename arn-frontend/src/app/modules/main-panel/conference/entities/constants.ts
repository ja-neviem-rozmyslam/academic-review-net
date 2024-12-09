import {TabOption} from '../../../components/tabs/entities/TabOption';
import {SelectOption} from '../../../components/arn-select/entities/SelectOption';

export const REVIEW = 'REVIEW';
export const DETAILS = 'DETAILS';

export const TABOPTIONS: TabOption[] = [
  { value: DETAILS, label: 'Detail Práce' },
  { value: REVIEW, label: 'Posudok' },
];

export const reviewRatingOptions: SelectOption[] = [
  { value: '1', display: 'Výborné' },
  { value: '2', display: 'Dobré' },
  { value: '3', display: 'Priemerné' },
  { value: '4', display: 'Dostačujúce' },
  { value: '5', display: 'Nedostatočné' }
];

