interface IMessages {
  readonly [key: string]: string;
}

export interface ILanguages {
  readonly [key: string]: IMessages;
}

const en: IMessages = {
  authorization_error: 'You don\'t have permissions to use this app',
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
  menu_privacy: 'Privacy Policy',
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
  main_dashboard_question_text_yes: 'You answered YES',
  main_dashboard_question_text_no: 'You answered NO',
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
  feedback_submit_success: 'Your feedback has been submitted.',
  privacy_policy_text_link: 'GDPR Guide',
  privacy_policy_text: 'Effective date: September 12, 2019\n\n' +
    'Reza Inc ("us", "we", or "our") operates the One Fabric mobile application (hereinafter referred to as the "Service").\n\n' +
    'This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you ' +
    'have associated with that data.\n\n' +
    'We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance ' +
    'with this policy. \n\n' +
    'Definitions\n' +
    'Service\n\n' +
    'Service is the One Fabric mobile application operated by One Fabric\n\n' +
    'Personal Data\n\n' +
    'Personal Data means data about a living individual who can be identified from those data (or from those and other information either in our ' +
    'possession or likely to come into our possession).\n\n' +
    'Usage Data\n\n' +
    'Usage Data is data collected automatically either generated by the use of the Service or from the Service infrastructure itself (for ' +
    'example, the duration of a page visit).\n\n' +
    'Cookies\n\n' +
    'Cookies are small files stored on your device (computer or mobile device).\n' +
    'Information Collection and Use\n' +
    'We collect several different types of information for various purposes to provide and improve our Service to you.\n\n' +
    'Types of Data Collected\n' +
    'Personal Data\n\n' +
    'While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or ' +
    'identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:\n\n' +
    '• Email address\n' +
    '• Password\n' +
    '• Paypal email address\n' +
    '• Photos\n' +
    '  The service requires a camera to capture images.\n' +
    '• Cookies and Usage Data\n\n' +
    'Usage Data\n\n' +
    'When you access the Service by or through a mobile device, we may collect certain information automatically, including, but not ' +
    'limited to, the type of mobile device you use, your mobile device unique ID, the IP address of your mobile device, your mobile operating system, ' +
    'the type of mobile Internet browser you use, unique device identifiers and other diagnostic data ("Usage Data").\n\n' +
    'Tracking Cookies Data\n\n' +
    'We use cookies and similar tracking technologies to track the activity on our Service and we hold certain information.\n\n' +
    'Cookies are files with a small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and ' +
    'stored on your device. Other tracking technologies are also used such as beacons, tags and scripts to collect and track information and ' +
    'to improve and analyse our Service.\n\n' +
    'You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you ' +
    'may not be able to use some portions of our Service.\n\n' +
    'Examples of Cookies we use:\n\n' +
    '• Session Cookies. We use Session Cookies to operate our Service.\n' +
    '• Preference Cookies. We use Preference Cookies to remember your preferences and various settings.\n' +
    '• Security Cookies. We use Security Cookies for security purposes.\n\n' +
    'Use of Data\n\n' +
    'One Fabric uses the collected data for various purposes:\n\n' +
    '• To provide and maintain the Service\n' +
    '• To gather the necessary data: responses to questions and captured photos\n' +
    '• To notify you about changes to our Service\n' +
    '• To provide customer care and support\n' +
    '• To provide analysis or valuable information so that we can improve the Service\n' +
    '• To monitor the usage of the Service\n' +
    '• To detect, prevent and address technical issues\n\n' +
    'Transfer Of Data\n\n' +
    'Your information, including Personal Data, may be transferred to - and maintained on - computers located outside of your state, province, country or ' +
    'other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.\n\n' +
    'If you are located outside United States and choose to provide information to us, please note that we transfer the data, including Personal Data, ' +
    'to United States and process it there.\n\n' +
    'Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.\n\n' +
    'One Fabric will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy ' +
    'and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the ' +
    'security of your data and other personal information.\n\n' +
    'Disclosure Of Data\n\n' +
    'Legal Requirements\n\n' +
    'One Fabric may disclose your Personal Data in the good faith belief that such action is necessary to:\n' +
    '• To protect and defend the rights or property of One Fabric\n' +
    '• To comply with a legal obligation\n' +
    '• To prevent or investigate possible wrongdoing in connection with the Service\n' +
    '• To protect the personal safety of users of the Service or the public\n' +
    '• To protect against legal liability\n\n' +
    'As an European citizen, under GDPR, you have certain individual rights. You can learn more about these guides in the',
  privacy_policy_text_second: '\nSecurity of Data\n\n' +
    'The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% ' +
    'secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.\n\n' +
    'Service Providers\n\n' +
    'We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to ' +
    'perform Service-related services or to assist us in analyzing how our Service is used.\n\n' +
    'These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it ' +
    'for any other purpose.\n\n' +
    'Links to Other Sites\n\n' +
    'Our Service may contain links to other sites that are not operated by us. If you click a third party link, you will be directed to that ' +
    'third party\'s site. We strongly advise you to review the Privacy Policy of every site you visit.\n\n' +
    'We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.\n' +
    'Children\'s Privacy\n\n' +
    'Our Service does not address anyone under the age of 18 ("Children").\n\n' +
    'We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are ' +
    'aware that your Child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from ' +
    'children without verification of parental consent, we take steps to remove that information from our servers.\n\n' +
    'Changes to This Privacy Policy\n\n' +
    'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.\n' +
    'We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "effective date" ' +
    'at the top of this Privacy Policy.\n\n' +
    'You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they ' +
    'are posted on this page.\n\n' +
    'Contact Us\n\n' +
    'If you have any questions about this Privacy Policy, please contact us:\n' +
    '• By email:support@rezainc.com\n'
};

export const translationMessages: ILanguages = {
  en
};