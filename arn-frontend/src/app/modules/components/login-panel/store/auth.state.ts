import {User} from '../../../objects/User';

export interface AuthState {
  user: User | null;
}
export const initialState: AuthState = {
  user: null,
};

