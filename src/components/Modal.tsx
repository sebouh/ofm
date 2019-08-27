import { Button } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Dimensions, Image, ImageStyle, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { eventEmitter } from '../services';
import { closeModal } from '../store/actions';
import { IReduxState } from '../store/store';
import { globalStyles, IModalConfigs } from '../utils';

interface IProps extends IModalConfigs {
  readonly closeModal: () => void;
}

const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

class ModalComponent extends PureComponent<IProps> {
  private renderIcon() {
    const { icon } = this.props;
    const style: ImageStyle = {};
    let iconImage;

    switch (icon) {
      case 'success':
        iconImage = require('../assets/images/illustrations/password.png');
        break;
      case 'feedback':
        iconImage = require('../assets/images/illustrations/feedback.png');
        break;
      case 'logout':
        iconImage = require('../assets/images/illustrations/logout.png');
        break;
      case 'redeem':
        iconImage = require('../assets/images/illustrations/redeem.png');
        break;
      default:
        iconImage = '';
    }

    if (!iconImage) {
      return null;
    }

    return <Image source={iconImage} style={[styles.icon, style]}/>;
  }

  private onClosePress = () => {
    if (this.props.event) {
      eventEmitter.emit(this.props.event);
    }
    this.props.closeModal();
  };

  private onCancelPress = () => {
    this.props.closeModal();
  };

  public render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        backdropOpacity={0.5}
        backdropColor={globalStyles.colors.black}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
        hideModalContentWhileAnimating={true}
      >
        <View style={[styles.container, this.props.confirm && { minHeight: 283 }]}>
          <Text style={styles.title}>
            <FormattedMessage id={this.props.title}/>
          </Text>
          {this.renderIcon()}
          <Text style={styles.description}>
            <FormattedMessage id={this.props.message}/>
          </Text>
          <View style={styles.separator}/>
          {!this.props.confirm ? (
            <Button transparent={true} style={styles.okay_button} onPress={this.onClosePress}>
              <Text style={styles.okay_button_text}>
                <FormattedMessage id={'modal_button_ok'}/>
              </Text>
            </Button>
          ) : (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <Button transparent={true} style={styles.okay_button} onPress={this.onClosePress}>
                <Text style={[styles.okay_button_text, { fontSize: 20, color: globalStyles.colors.middleGray }]}>
                  <FormattedMessage id={'modal_button_ok'}/>
                </Text>
              </Button>
              <Button transparent={true} style={styles.okay_button} onPress={this.onCancelPress}>
                <Text style={[styles.okay_button_text, { fontSize: 22 }]}>
                  <FormattedMessage id={'modal_button_cancel'}/>
                </Text>
              </Button>
            </View>
          )}

        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: deviceWidth - 32,
    minHeight: 308,
    backgroundColor: 'rgb(246, 246, 248)',
    borderRadius: 8,
    shadowColor: globalStyles.colors.black50,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 10,
    shadowOpacity: 1,
    padding: 24,
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    ...globalStyles.fonts.regular,
    lineHeight: 28,
    letterSpacing: 0.35,
    color: globalStyles.colors.purple
  },
  icon: {
    marginTop: 30
  },
  description: {
    marginTop: 30,
    ...globalStyles.fonts.regular,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
    textAlign: 'center',
    color: globalStyles.colors.black40
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(119, 20, 161, 0.25)',
    marginTop: 15
  },
  okay_button: {
    height: 40,
    marginTop: 15
  },
  okay_button_text: {
    fontSize: 22,
    ...globalStyles.fonts.semiBold,
    fontWeight: 'bold',
    lineHeight: 28,
    letterSpacing: 0.35,
    color: globalStyles.colors.purple
  }
});

const mapStateToProps = ({ settings }: IReduxState) => {
  return {
    ...settings.modal
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);