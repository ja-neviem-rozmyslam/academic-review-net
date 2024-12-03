export class SubmissionForm {
  id?: number;
  title: string;
  category: number;
  abstractEn: string;
  abstractSk: string;
  coauthors?: number[];
  conferenceId?: number;

  constructor() {
    this.title = '';
    this.category = 0;
    this.abstractEn = '';
    this.abstractSk = '';
  }
}
