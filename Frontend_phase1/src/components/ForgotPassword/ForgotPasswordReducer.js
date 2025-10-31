import { ForgotPassword as Action } from '../../constants/actionTypes';

const initialState = {
  showForgotPassword: false
};

export const ForgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case Action.SHOW_FORGOT_PASSWORD:
      return { ...state, showForgotPassword: true };
    case Action.HIDE_FORGOT_PASSWORD:
      return { ...state, showForgotPassword: false };
    default:
      return state;
  }
};

