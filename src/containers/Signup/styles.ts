import { StyleSheet } from 'react-native';
import { globalStyles } from '../../utils';

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
      },
      button: {
        backgroundColor: globalStyles.colors.purple,
        borderRadius: 10,
        height: 50
      },
      button_text: {
        color: globalStyles.colors.white,
        ...globalStyles.fonts.semiBold,
        fontSize: 17,
        fontWeight: '600',
        letterSpacing: -0.41,
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
        fontSize: 20,
        paddingLeft: 10,
        paddingRight: 0,
        paddingTop: 5
      }
    }
  )
};