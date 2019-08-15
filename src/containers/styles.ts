import { StyleSheet } from 'react-native';
import { globalStyles } from '../utils';

export default {
  common: StyleSheet.create(
    {
      container: {
        backgroundColor: globalStyles.colors.bgColor,
        flex: 1
      },
      inner_container: {
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 40
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
        bottom: 40,
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
  )
};