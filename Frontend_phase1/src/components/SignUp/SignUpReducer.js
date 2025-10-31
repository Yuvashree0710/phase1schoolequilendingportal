import { SignUp as Action } from '../../constants/actionTypes';

const initialState = {
  showSignUp: false
};

export const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case Action.SHOW_SIGNUP:
      return { ...state, showSignUp: true };
    case Action.HIDE_SIGNUP:
      return { ...state, showSignUp: false };
    default:
      return state;
  }
};