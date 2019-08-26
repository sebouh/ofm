import { ActionConstShort } from 'react-native-router-flux';
import Loader from './containers/Loader';
import MainDashboard from './containers/MainDashboard';
import ProfileInitial from './containers/Profile/ProfileInitial';
import RedeemConfirmation from './containers/Redeem/RedeemConfirmation';
import RedeemInitial from './containers/Redeem/RedeemInitial';
import SignInInitial from './containers/SignIn/SignInInitial';
import SigninNewPassword from './containers/SignIn/SigninNewPassword';
import SigninRecoverPassword from './containers/SignIn/SigninRecoverPassword';
import SignupEmailPassword from './containers/Signup/SignupEmailPassword';
import SignupNewPassword from './containers/Signup/SignupNewPassword';
import SignupPaypalEmail from './containers/Signup/SignupPaypalEmail';

interface IRoute {
  readonly key: string;
  readonly component: any;
  readonly initial?: boolean;
  readonly type?: ActionConstShort;
}

const routes: IRoute[] = [
  {
    key: 'loader',
    component: Loader
  },
  {
    key: 'signup_email_pass',
    component: SignupEmailPassword
  },
  {
    key: 'signup_new_password',
    component: SignupNewPassword,
  },
  {
    key: 'signup_paypal',
    component: SignupPaypalEmail
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
    component: MainDashboard
  },
  {
    key: 'redeem_initial',
    component: RedeemInitial
  },
  {
    key: 'redeem_confirmation',
    component: RedeemConfirmation,
  },
  {
    key: 'profile_initial',
    component: ProfileInitial
  },
  {
    key: 'profile_change_pass',
    component: ProfileInitial
  }
];

export default routes;