export interface IModalConfigs {
  readonly title: string;
  readonly icon: 'feedback' | 'logout' | 'redeem' | 'success' | '';
  readonly message: string;
  readonly confirm: boolean;
  readonly isVisible: boolean;
  readonly event?: string;
}