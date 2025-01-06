export class FormValidationErrors {
  emptyFields: string[];
  invalidEmails: string[];

  constructor() {
    this.emptyFields = [];
    this.invalidEmails = [];
  }
}
