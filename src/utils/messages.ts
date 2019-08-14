interface IMessages {
  readonly [key: string]: string;
}

export interface ILanguages {
  readonly [key: string]: IMessages;
}

const en: IMessages = {
  email: 'Email Address',
  signup_title: 'Sign Up',
  signup_temp_password: 'Temporary Password',
  signup_login_orefix: 'Already have account? Just',
  signup_login_suffix: 'Sign In!',
  signin_password: 'Password',
  signin_title: 'Sign In',
  next_button: 'NEXT',

};

export const translationMessages: ILanguages = {
  en
};