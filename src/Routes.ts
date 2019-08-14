import { ActionConstShort } from 'react-native-router-flux';
import SignInInitial from './containers/SignIn/SignInInitial';
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
    component: SignInInitial,
    initial: true
  }
];

export default routes;