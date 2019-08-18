import { StyleSheet } from 'react-native';
import { globalStyles } from '../../utils';

export default {
  questions_list: StyleSheet.create(
    {
      container: {
        marginTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        flex: 1
      }
    }
  ),
  question: StyleSheet.create(
    {
      container: {
        borderRadius: 10,
        backgroundColor: globalStyles.colors.white,
        shadowColor: globalStyles.colors.black50,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowRadius: 4,
        shadowOpacity: 1,
        marginBottom: 16,
        paddingTop: 24,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 26
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      title: {
        maxWidth: 223,
        ...globalStyles.fonts.regular,
        color: globalStyles.colors.black40,
        fontSize: 17,
        lineHeight: 22,
        letterSpacing: -0.41
      },
      points: {
        ...globalStyles.fonts.semiBold,
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 25,
        letterSpacing: 0.38,
        color: globalStyles.colors.black40
      },
      answer: {
        ...globalStyles.fonts.regular,
        fontSize: 17,
        color: globalStyles.colors.middleGray,
        letterSpacing: -0.41,
        marginTop: 18
      },
      photo_container: {
        marginTop: 16,
        alignSelf: 'center',
        position: 'relative',
        width: 125,
        height: 125
      },
      photo_delete_button: {
        position: 'absolute',
        top: 10,
        right: 9,
        height: 22
      },
      camera_container: {
        borderRadius: 7,
        backgroundColor: globalStyles.colors.gray,
        borderColor: globalStyles.colors.darkGray,
        borderWidth: 1,
        width: 125,
        height: 125,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        alignSelf: 'center'
      },
      photo_text: {
        fontSize: 13,
        ...globalStyles.fonts.regular,
        color: 'rgba(112, 112, 112, 0.7)',
        letterSpacing: 0.25,
        marginTop: 8
      },
      divider: {
        marginTop: 16,
        height: 1,
        width: '100%',
        backgroundColor: 'rgba(151, 151, 151, 0.25)'
      },
      footer: {
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      timer_container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      timer_text: {
        marginLeft: 11,
        ...globalStyles.fonts.regular,
        fontSize: 17,
        letterSpacing: -0.41,
        color: globalStyles.colors.middleGray
      },
      yes_no_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      answer_button: {
        height: 'auto'
      },
      vertical_separator: {
        height: 25,
        width: 1,
        backgroundColor: 'rgba(151, 151, 151, 0.25)',
        marginLeft: 23,
        marginRight: 23
      },
      answer_button_text: {
        ...globalStyles.fonts.regular,
        fontSize: 17,
        letterSpacing: 0.32,
        color: globalStyles.colors.middleGray
      },
      answer_button_text_active: {
        color: globalStyles.colors.purple
      },
      cancel_submit_text: {
        ...globalStyles.fonts.regular,
        fontSize: 17,
        letterSpacing: 0.32,
        color: globalStyles.colors.middleGray
      }
    }
  )
};