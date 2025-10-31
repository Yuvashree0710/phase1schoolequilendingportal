import { ForgotPasswordReducer } from '../components/ForgotPassword/ForgotPasswordReducer';
import { signUpReducer } from '../components/SignUp/SignUpReducer';

const rootReducer = (state, action) => {
  return {
    ForgotPassword: ForgotPasswordReducer(state.ForgotPassword, action),
    signUp: signUpReducer(state.signUp, action),
  };
};

export default rootReducer;
