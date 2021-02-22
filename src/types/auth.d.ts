import { User } from 'types';

interface Auth extends User {
  token: string;
}

export { Auth };
