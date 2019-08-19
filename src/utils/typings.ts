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

export interface IReferalPositions {
  readonly companyId: number;
  readonly companyName: string;
  readonly description: string;
  readonly id: number;
  readonly name: string;
  readonly url?: string;
}

export interface IUser {
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly setupComplete: null | boolean;
  readonly storeId: number;
  readonly dateOfBirth: string;
  readonly phoneNumber: string;
  readonly paypalEmail: null | string;
}