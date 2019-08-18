import { ActionConstShort } from 'react-native-router-flux';
import MainDashboard from './containers/MainDashboard';
import SignInInitial from './containers/SignIn/SignInInitial';
import SigninNewPassword from './containers/SignIn/SigninNewPassword';
import SigninRecoverPassword from './containers/SignIn/SigninRecoverPassword';
import SignupEmailPassword from './containers/Signup/SignupEmailPassword';

interface IRoute {
  readonly key: string;
  readonly component: any;
  readonly initial?: boolean;
  readonly type?: ActionConstShort;
}

const routes: IRoute[] = [
  {
    key: 'signup_email_pass',
    component: SignupEmailPassword
  },
  {
    key: 'sign_in_initial',
    component: SignInInitial
  },
  {
    key: 'sign_in_recover_password',
    component: SigninRecoverPassword,
  },
  {
    key: 'sign_in_new_password',
    component: SigninNewPassword
  },
  {
    key: 'main_dashboard',
    component: MainDashboard,
    // initial: true
  }
];

export default routes;