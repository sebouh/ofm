interface IMessages {
  readonly [key: string]: string;
}

export interface ILanguages {
  readonly [key: string]: IMessages;
}

const en: IMessages = {
  signup_title: 'Sign Up',
  signup_email: 'Email Address',
  signup_password: 'Temporary Password',
  next_button: 'NEXT'
};

export const translationMessages: ILanguages = {
  en
};