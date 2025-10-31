
import { ForgotPassword as ForgotPasswordActions } from '../../constants/actionTypes';

export const handleForgotPasswordClick = (dispatch) => (e) => {
  e.preventDefault();
  dispatch({ type: ForgotPasswordActions.SHOW_FORGOT_PASSWORD });
};

export const handleCloseForgotPassword = (dispatch) => () => {
  dispatch({ type: ForgotPasswordActions.HIDE_FORGOT_PASSWORD });
};