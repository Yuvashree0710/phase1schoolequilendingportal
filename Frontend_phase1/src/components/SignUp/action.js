import { SignUp as SignUpActions } from '../../constants/actionTypes';

export const handleSignUpClick = (dispatch) => (e) => {
  e.preventDefault();
  dispatch({ type: SignUpActions.SHOW_SIGNUP });
};

export const handleCloseSignUp = (dispatch) => () => {
  dispatch({ type: SignUpActions.HIDE_SIGNUP });
};