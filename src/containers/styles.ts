import { StyleSheet } from 'react-native';
import { globalStyles } from '../utils';

export default {
  common: StyleSheet.create(
    {
      container: {
        backgroundColor: globalStyles.colors.bgColor,
        flex: 1
      },
      input_container: {
        borderRadius: 10,
        backgroundColor: globalStyles.colors.white,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0
      },
      input: {
        fontSize: 15,
        letterSpacing: -0.24,
        color: globalStyles.colors.black,
        paddingLeft: 13,
        ...globalStyles.fonts.regular,
        fontWeight: 'normal',
        fontStyle: 'normal',
      }
    }
  ),
  email_pass: StyleSheet.create(
    {
      inner_container: {
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 40
      },
      title: {
        ...globalStyles.fonts.regularPro,
        fontWeight: '300',
        fontStyle: 'normal',
        fontSize: 22,
        lineHeight: 28,
        letterSpacing: 0.35,
        color: globalStyles.colors.black40,
      },
      icon: {
        marginLeft: 10,
        marginTop: 5
      },
      sign_in: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      sign_in_text: {
        fontSize: 15,
        ...globalStyles.fonts.regular,
        lineHeight: 20,
        letterSpacing: -0.24,
        color: globalStyles.colors.black
      },
      sign_in_text_bold: {
        ...globalStyles.fonts.semiBold
      }
    }
  )
};