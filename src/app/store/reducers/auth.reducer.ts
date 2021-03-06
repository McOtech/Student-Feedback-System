import { ACTION_LOGIN, ACTION_LOGOUT } from '../actions/auth.action';

export interface AuthToken {
  code: string;
  category: string;
  status: boolean;
}

const initialAuthState: AuthToken = {
  code: undefined,
  category: undefined,
  status: false
};

export function authReducer(state = initialAuthState, action): AuthToken {
  switch (action.type) {
    case ACTION_LOGIN:
      return {
        ...state,
        code: action.code,
        category: action.category,
        status: action.status
      };
    case ACTION_LOGOUT:
      return {
        ...state,
        code: undefined,
        category: undefined,
        status: false
      };
  }
  return state;
}
