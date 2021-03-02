import {Authorities} from './authorities';

export class User {
  id: number;
  username: string;
  email: string;
  password: string;
  emailConfirmation: string;
  authorities: Authorities[];
}
