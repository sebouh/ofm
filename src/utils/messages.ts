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
  already_signed_up_error: 'You have already signed up. Please use the login form to continue.',
  not_signed_up_error: 'You haven \'t signed up to application. Please use the sign up form to continue.',
  next_button: 'NEXT',
  submit_button: 'SUBMIT',
  modal_success_title: 'Success',
  modal_email_desc: 'You will receive an Email with password recovery details.',
  modal_button_ok: 'OK',
  modal_button_cancel: 'CANCEL',
  menu_title: 'Menu',
  menu_profile: 'Profile',
  menu_feedback: 'Feedback',
  menu_logout: 'Logout',
  menu_logout_confirm: 'Are you sure you want to logout?',
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
  signin_recovery_description_input: 'Enter the code sent to the mail.',
  signin_recovery_wrong_code: 'Invalid code. Please enter again',
  code_confirmation_sms_not: 'Didn’t get the code?',
  code_confirmation_send_again: 'SEND AGAIN',
  code_confirmation_send_again_message: 'Sending a new code will be possible after',
  code_confirmation_send_again_second: 'sec.',
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
  redeem_finished_desc: 'The redeemed amount will be sent to your PayPal account after review.',
  profile_title: 'Profile',
  profile_initial_change_pass: 'Change Password',
  profile_initial_save: 'Save',
  profile_initial_save_message: 'Your data has been saved.',
  profile_pass_old_title: 'Enter Old Password',
  profile_new_pass_title: 'Enter New Password',
  profile_new_pass_confirm_title: 'Re-Enter New Password',
  profile_new_pass_empty_fields: 'Old, New and Confirm Password fields should not be empty',
  profile_new_pass_validation: 'Password should have at least one upper case letter and 6 characters',
  profile_new_pass_validation_max: 'Password should not be greater than 30 characters',
  profile_incorrect_old_pass: 'Old password is incorrect',
  profile_new_pass_success_message: 'You password has been changed.',
  feedback_title: 'Feedback',
  feedback_message: 'Please be free to add your suggestions and observations.',
  feedback_placeholder: 'Type here to start write a feedback',
  feedback_submit: 'SUBMIT',
  feedback_submit_success: 'Your feedback has been submitted.'
};

export const translationMessages: ILanguages = {
  en
};