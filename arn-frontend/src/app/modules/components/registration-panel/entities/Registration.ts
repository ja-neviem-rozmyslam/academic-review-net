export class Registration {
  name: string;
  surname: string;
  email: string;
  password: string;
  universityId: number;

  constructor() {
    this.name = '';
    this.surname = '';
    this.email = '';
    this.password = '';
    this.universityId = null;
  }
}
