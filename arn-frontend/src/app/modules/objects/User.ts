import {University} from './University';

export class User {
  id: number;
  name: string;
  surname: string;
  email: string;
  registrationDate: Date;
  university: University;
  roles: string[];

  constructor(
    id: number,
    name: string,
    surname: string,
    email: string,
    registrationDate: Date,
    university: University,
    roles: string[]
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.registrationDate = registrationDate;
    this.university = university;
    this.roles = roles;
  }
}
