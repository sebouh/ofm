interface IMessages {
  readonly [key: string]: string;
}

export interface ILanguages {
  readonly [key: string]: IMessages;
}

const en: IMessages = {
  email: 'Email Address',
  paypal_email: 'Paypal Email Address',
  back_button: 'Back',
  incorrect_email_pass: 'Incorrect Password or Email Address.',
  incorrect_email: 'Incorrect Email Address.',
  next_button: 'NEXT',
  submit_button: 'SUBMIT',
  modal_success_title: 'Success',
  modal_email_desc: 'You will receive an Email with password recovery details.',
  modal_button_ok: 'OK',
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
  signin_recovery_description: 'Enter your Email and we’ll send you a code to reset your password.',
  signin_recovery_error: 'Your entered Email is not registered',
  signin_recover_password_input_one: 'New Password',
  signin_recover_password_input_two: 'Confirm Password',
  signin_recover_password_empty_fields: 'New Password and Confirm Password fields should not be empty',
  signin_recover_password_not_corresponding: 'New Password and Confirm Password should be the same',
  main_dashboard_navigator_questions: 'Questions',
  main_dashboard_navigator_refer: 'Refer a Friend',
  main_dashboard_photo: 'TAKE A PHOTO',
  main_dashboard_question_text_yes : 'You answered YES',
  main_dashboard_question_text_no : 'You answered NO',
  main_dashboard_question_yes: 'YES',
  main_dashboard_question_no: 'NO',
  main_dashboard_question_points: 'pts',
  main_dashboard_question_cancel: 'CANCEL',
  main_dashboard_question_submit: 'SUBMIT',
  main_dashboard_question_answered: 'ANSWERED',
  main_dashboard_refer_title_1: 'Help us find new employees for our stores.',
  main_dashboard_refer_title_2: 'You will be awarded 500pts if we hire the person referred by link and they stay with us for at least 90 days.',
  main_dashboard_refer_title_3: 'Please select the position of employee you want to invite.',
  main_dashboard_refer_payment_method_title: 'Select the intive method.',
  main_dashboard_refer_payment_method_sms: 'VIA SMS',
  main_dashboard_refer_payment_method_email: 'VIA E-MAIL',
  tab_bar_earn: 'EARN',
  tab_bar_redeem: 'REDEEM',
  unhandled_error: 'Something went wrong. Please try again!',
  redeem_title: 'Redeem',
  redeem_points: 'Points available',
  redeem_currency: 'USD',
  redeem_place: 'Redeem to your PayPal account',
  redeem_notice: 'You can Redeem if earned money exceeds $10.',
  redeem_confirmation_title: 'Confirmation Page',
  redeem_confirmation_info: 'You are redeeming {points} points for a total of {amount}. This amount will be sent to your PayPal account.',
  redeem_confirm_button: 'CONFIRM',
  redeem_finished_desc: 'The redeemed amount will be sent to your PayPal account after review.'
};

export const translationMessages: ILanguages = {
  en
};