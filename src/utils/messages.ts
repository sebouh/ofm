interface IMessages {
  readonly [key: string]: string;
}

export interface ILanguages {
  readonly [key: string]: IMessages;
}

const en: IMessages = {
  email: 'Email Address',
  back_button: 'Back',
  incorrect_email_pass: 'Incorrect Password or Email Address.',
  incorrect_email: 'Incorrect Email Address.',
  signup_title: 'Sign Up',
  signup_temp_password: 'Temporary Password',
  signup_login_prefix: 'Already have account? Just',
  signup_login_suffix: 'Sign In!',
  signin_password: 'Password',
  signin_title: 'Sign In',
  signin_forgot_title: 'Forgot your password?',
  signin_create_account_prefix: 'No account yet?',
  signin_create_account_suffix: 'Create one!',
  signin_recovery_title: 'Password Recovery',
  signin_recovery_description: 'Enter your Email and we’ll send you a link to reset your password.',
  signin_recovery_error: 'Your entered Email is not registered',
  next_button: 'NEXT',
  submit_button: 'SUBMIT',

};

export const translationMessages: ILanguages = {
  en
};