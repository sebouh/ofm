interface IMessages {
  readonly [key: string]: string;
}

export interface ILanguages {
  readonly [key: string]: IMessages;
}

const en: IMessages = {
  email: 'Email Address',
  incorrect_email_pass: 'Incorrect Password or Email Address.',
  signup_title: 'Sign Up',
  signup_temp_password: 'Temporary Password',
  signup_login_prefix: 'Already have account? Just',
  signup_login_suffix: 'Sign In!',
  signin_password: 'Password',
  signin_title: 'Sign In',
  signin_forgot_title: 'Forgot your password?',
  signin_create_account_prefix: 'No account yet?',
  signin_create_account_suffix: 'Create one!',
  next_button: 'NEXT',

};

export const translationMessages: ILanguages = {
  en
};