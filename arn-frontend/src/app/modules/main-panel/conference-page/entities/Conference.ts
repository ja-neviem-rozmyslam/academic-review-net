import {ReviewFormObject} from '../../conference/entities/ReviewFormObject';

export class Conference {
  id?: number = null;
  conferenceName: string = '';
  password?: string = null;
  uploadDeadline: string = '';
  reviewDeadline: string = '';
  faculty: string = '';
  reviewForm: ReviewFormObject[] = [];
  closed?: boolean = false;
}
