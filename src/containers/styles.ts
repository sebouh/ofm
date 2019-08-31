import { Dimensions, StyleSheet } from 'react-native';
import { globalStyles } from '../utils';
import { IS_SMALL_HEIGHT } from '../utils/constants';

const { width } = Dimensions.get('window');

export default {
  common: StyleSheet.create(
    {
      container: {
        backgroundColor: globalStyles.colors.bgColor,
        flex: 1,
      },
      inner_container: {
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: IS_SMALL_HEIGHT ? 20 : 40
      },
      input_container: {
        borderRadius: 10,
        backgroundColor: globalStyles.colors.white,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0
      },
      top_title: {
        ...globalStyles.fonts.regularPro,
        fontWeight: '300',
        fontStyle: 'normal',
        fontSize: 22,
        lineHeight: 28,
        letterSpacing: 0.35,
        color: globalStyles.colors.black40,
      },
      input: {
        fontSize: 15,
        letterSpacing: -0.24,
        color: globalStyles.colors.black,
        paddingLeft: 13,
        ...globalStyles.fonts.regular,
        fontWeight: 'normal',
        fontStyle: 'normal',
      },
      bottom_button: {
        position: 'absolute',
        bottom: IS_SMALL_HEIGHT ? 10 : 40,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      bottom_button_text: {
        fontSize: 15,
        ...globalStyles.fonts.regular,
        lineHeight: 20,
        letterSpacing: -0.24,
        color: globalStyles.colors.black
      },
      bottom_button_bold: {
        ...globalStyles.fonts.semiBold
      },
      email_pass_error: {
        marginTop: 8,
        color: globalStyles.colors.errorRed,
        fontSize: 15,
        ...globalStyles.fonts.regular,
        lineHeight: 20,
        letterSpacing: -0.24
      }
    }
  ),
  email_pass: StyleSheet.create(
    {
      icon: {
        marginLeft: 10,
        marginTop: 5
      },
    }
  ),
  sign_in: StyleSheet.create(
    {
      forgot_button: {
        marginTop: 40,
        justifyContent: 'flex-end'
      },
      forgot_button_text: {
        ...globalStyles.fonts.regular,
        fontSize: 15,
        lineHeight: 20,
        letterSpacing: -0.24,
        color: globalStyles.colors.black
      }
    }
  ),
  password_recovery: StyleSheet.create(
    {
      description: {
        marginTop: 32,
        fontSize: 15,
        lineHeight: 20,
        letterSpacing: -0.24,
        ...globalStyles.fonts.regular,
        color: globalStyles.colors.black,
        textAlign: 'center'
      }
    }
  ),
  confirm_code: StyleSheet.create(
    {
      confirmation_code_input_style: {
        ...globalStyles.fonts.regular,
        fontSize: 15,
        fontWeight: '600',
        letterSpacing: -0.24,
        color: globalStyles.colors.purple,
        backgroundColor: '#fff',
        width: 38,
        height: 50,
        borderRadius: 15
      },
      confirmation_wrong_code: {
        ...globalStyles.fonts.regular,
        fontSize: 13,
        lineHeight: 21,
        letterSpacing: 0,
        color: '#e2405c',
        textAlign: 'center',
      },
      confirmation_info_footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
      },
      confirmation_loader: {
        height: 44,
        width: '100%',
        backgroundColor: globalStyles.colors.purple
      },
      confirmation_info_didnt_receive: {
        ...globalStyles.fonts.regular,
        textAlign: 'center',
        lineHeight: 20,
        letterSpacing: -0.21,
        color: globalStyles.colors.black40,
        fontSize: 13
      },
      confirmation_countdown_container: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      confirmation_countdown_text: {
        color: globalStyles.colors.purple,
        ...globalStyles.fonts.semiBold,
        fontSize: 13,
        lineHeight: 21,
        letterSpacing: 0.42
      },
      confirmation_send_again: {
        ...globalStyles.fonts.semiBold,
        fontSize: 13,
        textAlign: 'center',
        marginTop: 6,
        lineHeight: 20,
        letterSpacing: -0.21,
        color: globalStyles.colors.purple
      }
    }
  ),
  main_dashboard: StyleSheet.create(
    {
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: globalStyles.colors.white,
        shadowColor: globalStyles.colors.black50,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 1,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 24,
        paddingRight: 24
      },
      button: {
        width: (width - 75) / 2,
        height: 28,
        borderRadius: 10,
        borderColor: globalStyles.colors.purple,
        justifyContent: 'center',
        alignItems: 'center'
      },
      button_active: {
        borderWidth: 0
      },
      gradient: {
        flex: 1,
        height: 28,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
      },
      button_text: {
        color: globalStyles.colors.white,
        ...globalStyles.fonts.regular,
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: -0.31
      },
      button_text_active: {
        color: globalStyles.colors.purple,
      }
    }
  ),
  redeem_initial: StyleSheet.create(
    {
      container: {
        flex: 1,
        backgroundColor: '#f6f6f8'
      },
      card: {
        borderRadius: 10,
        backgroundColor: globalStyles.colors.white,
        shadowColor: globalStyles.colors.black50,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowRadius: 2,
        shadowOpacity: 1,
        margin: 16,
        paddingTop: 16,
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 24
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 9
      },
      text_big: {
        ...globalStyles.fonts.regular,
        fontSize: 17,
        lineHeight: 22,
        letterSpacing: -0.41,
        color: globalStyles.colors.middleGray
      },
      text_big_bold: {
        lineHeight: 25,
        letterSpacing: 0.32,
        color: globalStyles.colors.black40,
        fontWeight: '600'
      },
      separator: {
        backgroundColor: 'rgba(151, 151, 151, 0.25)',
        height: 1,
        width: '100%'
      },
      redeem_notice_one: {
        ...globalStyles.fonts.regular,
        fontSize: 15,
        lineHeight: 25,
        letterSpacing: 0.28,
        color: globalStyles.colors.middleGray
      },
      redeem_notice_two: {
        ...globalStyles.fonts.regular,
        fontSize: 13,
        lineHeight: 18,
        letterSpacing: -0.08,
        color: globalStyles.colors.black40,
        marginTop: 16
      },
      button: {
        justifyContent: 'flex-end',
        marginTop: 24,
        height: 'auto'
      },
      button_text: {
        ...globalStyles.fonts.regular,
        fontSize: 17,
        lineHeight: 25,
        letterSpacing: 0.32,
        color: globalStyles.colors.purple,
        fontWeight: '500'
      },
      button_text_disabled: {
        color: globalStyles.colors.middleGray
      },
      confirm_info_text: {
        ...globalStyles.fonts.regular,
        fontSize: 15,
        lineHeight: 20,
        letterSpacing: -0.24,
        color: globalStyles.colors.black40
      }
    }
  ),
  profile_initial: StyleSheet.create(
    {
      container: {
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 24
      },
      label: {
        paddingTop: IS_SMALL_HEIGHT ? 10 : 24,
        color: 'rgba(0, 0, 0, 0.5)',
        ...globalStyles.fonts.regular,
        fontSize: 13,
        lineHeight: 18,
        letterSpacing: -0.08
      },
      change_pass: {
        justifyContent: 'flex-start',
        marginTop: 36,
        height: 'auto',
        alignSelf: 'flex-start'
      },
      change_pass_text: {
        ...globalStyles.fonts.regular,
        fontSize: 15,
        lineHeight: 20,
        letterSpacing: -0.24,
        color: globalStyles.colors.black,
        marginLeft: 8
      },
      save_button: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 37,
        paddingRight: 37,
        borderRadius: 15,
        borderColor: globalStyles.colors.purple,
        marginTop: IS_SMALL_HEIGHT ? 30 : 100,
        height: 'auto'
      },
      save_button_text: {
        color: globalStyles.colors.purple,
        fontSize: 17,
        fontWeight: '500',
        textTransform: 'uppercase',
        lineHeight: 22,
        letterSpacing: -0.41
      }
    }
  ),
  feedback: StyleSheet.create(
    {
      container: {
        flex: 1,
        padding: 24
      },
      description: {
        ...globalStyles.fonts.regular,
        fontSize: 15,
        lineHeight: 22,
        letterSpacing: -0.36,
        color: globalStyles.colors.middleGray
      },
      input: {
        borderColor: globalStyles.colors.darkGray,
        borderBottomWidth: 1,
        paddingBottom: 7.5,
        marginTop: 24,
        fontSize: 15,
        lineHeight: 25,
        ...globalStyles.fonts.regular,
        color: globalStyles.colors.middleGray
      },
      button: {
        marginTop: 44,
        paddingTop: 6,
        paddingRight: 32,
        paddingBottom: 6,
        paddingLeft: 32,
        marginBottom: 50
      },
      button_disabled: {
        borderColor: 'rgba(112, 112, 112, 0.5)'
      },
      button_disabled_text: {
        color: 'rgba(112, 112, 112, 0.5)'
      }
    }
  )
};