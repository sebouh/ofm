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
        lineHeight: 20,
        letterSpacing: -0.24,
        color: globalStyles.colors.black,
        paddingLeft: 13,
        fontFamily: 'SFProText'
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
        fontSize: 22,
        fontWeight: '300',
        lineHeight: 28,
        letterSpacing: 0.35,
        color: globalStyles.colors.black40
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