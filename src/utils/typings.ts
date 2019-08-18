export interface IModalConfigs {
  readonly title: string;
  readonly icon: 'feedback' | 'logout' | 'redeem' | 'success' | '';
  readonly message: string;
  readonly confirm: boolean;
  readonly isVisible: boolean;
  readonly event?: string;
}

export interface IQuestions {
  readonly disabled?: boolean;
  readonly duration: number;
  readonly id: number;
  readonly pictureRequired: boolean;
  readonly question: string;
  readonly value: number;
  readonly image?: string;
  readonly answer?: string;
}