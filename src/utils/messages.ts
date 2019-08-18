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
  signin_recovery_description: 'Enter your Email and we’ll send you a link to reset your password.',
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
  tab_bar_earn: 'EARN',
  tab_bar_redeem: 'REDEEM',
};

export const translationMessages: ILanguages = {
  en
};