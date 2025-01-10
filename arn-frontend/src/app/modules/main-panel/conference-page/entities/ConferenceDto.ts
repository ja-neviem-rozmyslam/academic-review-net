export interface ConferenceDto {
  id: number;
  conferenceName: string;
  faculty: string;
  joined: boolean;
  uploadDeadline: string;
  reviewDeadline: string;
  creationDate: string;
  reviewForm: string;
  hasPassword: boolean;
}
