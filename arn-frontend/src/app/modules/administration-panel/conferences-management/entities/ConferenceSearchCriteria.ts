export interface ConferenceSearchCriteria {
  name?: string;
  faculty?: string;
  uploadDeadlineStart?: string;
  uploadDeadlineEnd?: string;
  reviewDeadlineStart?: string;
  reviewDeadlineEnd?: string;
  closed?: boolean;
}
