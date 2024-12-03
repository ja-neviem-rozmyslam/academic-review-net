import {Submission} from './Submission';

export interface ConferenceDetail {
  id: number;
  uploadDeadline: string;
  reviewDeadline: string;

  submission?: Submission;

  review?: string;
  reviewForm: string;
}
