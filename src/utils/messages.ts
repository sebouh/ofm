interface IMessages {
  readonly [key: string]: string;
}

export interface ILanguages {
  readonly [key: string]: IMessages;
}

const en: IMessages = {
  signup_title: 'Sign Up'
};

export const translationMessages: ILanguages = {
  en
};