import {Submission} from './Submission';
import {ReviewBlock} from './Review';
import {ReviewFormObject} from './ReviewFormObject';

export interface ConferenceDetail {
  id: number;
  uploadDeadline: string;
  reviewDeadline: string;

  submission?: Submission;

  review?: ReviewBlock[];
  reviewForm: ReviewFormObject[];
}
