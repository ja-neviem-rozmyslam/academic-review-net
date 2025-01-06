import {TabOption} from '../../../components/tabs/entities/TabOption';

export const SUBMISSION = 'SUBMISSIONS';
export const REVIEW = 'REVIEWS';

export const TABOPTIONS: TabOption[] = [
  { value: SUBMISSION, label: 'Odovzdané práce', disabled: false},
  { value: REVIEW, label: 'Práce na hodnotenie', disabled: false},
];
