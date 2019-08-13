interface IMessages {
  readonly [key: string]: string;
}

export interface ILanguages {
  readonly [key: string]: IMessages;
}

const en: IMessages = {};

export const translationMessages: ILanguages = {
  en
};