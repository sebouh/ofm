import { Dimensions } from 'react-native';

export enum emitterEvents {
  on_email_recover_modal_close = 'on_email_recover_modal_close',
  on_redeem_modal_close = 'on_redeem_modal_close',
  on_password_change_modal_close = 'on_password_change_modal_close',
  on_feedback_sent_modal_close = 'on_feedback_sent_modal_close',
  on_logout_confirm_modal_close = 'on_logout_confirm_modal_close'
}

export const IS_SMALL_HEIGHT = Dimensions.get('window').height <= 650;