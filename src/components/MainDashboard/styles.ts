import { StyleSheet } from 'react-native';
import { globalStyles } from '../../utils';
import { IS_SMALL_HEIGHT } from '../../utils/constants';

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
        maxWidth: IS_SMALL_HEIGHT ? 120 : 180,
        ...globalStyles.fonts.regular,
        color: globalStyles.colors.black40,
        fontSize: IS_SMALL_HEIGHT ? 16 : 17,
        lineHeight: 22,
        letterSpacing: -0.41
      },
      points: {
        ...globalStyles.fonts.semiBold,
        fontSize: IS_SMALL_HEIGHT ? 18 : 20,
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
      overlay: {
        position: 'absolute',
        zIndex: 4,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
      },
      loader: {
        position: 'absolute',
        zIndex: 5,
        top: '50%',
        marginTop: -18,
        left: '50%',
        marginLeft: -18,
        backgroundColor: 'transparent'
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
        marginTop: 8,
        textAlign: 'center'
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
  ),
  refer: StyleSheet.create(
    {
      top_container: {
        paddingTop: 24,
        paddingLeft: 24,
        paddingRight: 24
      },
      top_text: {
        ...globalStyles.fonts.regular,
        fontSize: 15,
        lineHeight: 20,
        letterSpacing: -0.24,
        color: globalStyles.colors.black40,
        marginBottom: 8
      },
      bottom_container: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 16
      },
      item: {
        borderRadius: 10,
        width: '100%',
        backgroundColor: globalStyles.colors.white,
        shadowColor: globalStyles.colors.black50,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowRadius: 4,
        shadowOpacity: 1,
        marginBottom: 16,
        padding: 24
      },
      item_text: {
        ...globalStyles.fonts.regular,
        fontSize: 17,
        lineHeight: 22,
        letterSpacing: -0.41,
        color: globalStyles.colors.middleGray,
        textTransform: 'uppercase'
      },
      item_expand_button: {
        height: 'auto',
        width: 70,
        justifyContent: 'flex-end'
      },
      additionalInfo: {
        marginTop: 16
      },
      positionUrl: {
        ...globalStyles.fonts.regular,
        fontSize: 15,
        lineHeight: 20,
        letterSpacing: -0.24,
        color: globalStyles.colors.middleGray
      },
      divider: {
        marginTop: 8,
        backgroundColor: 'rgba(151, 151, 151, 0.25)',
        width: '100%',
        height: 1
      },
      inviteMethodTitle: {
        ...globalStyles.fonts.regular,
        fontSize: 13,
        lineHeight: 18,
        letterSpacing: -0.08,
        color: globalStyles.colors.black40,
        marginTop: 15.5
      },
      inviteButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 6
      },
      inviteButton: {
        height: 'auto'
      },
      inviteButtonText: {
        color: globalStyles.colors.purple,
        ...globalStyles.fonts.regular,
        fontSize: 17,
        lineHeight: 25,
        letterSpacing: 0.32
      },
      buttonDivider: {
        marginLeft: 23,
        marginRight: 23,
        width: 1,
        height: 25,
        backgroundColor: globalStyles.colors.darkGray
      }
    }
  )
};