import { Button } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Alert, SafeAreaView, Text, View } from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
// @ts-ignore
import CountDown from 'react-native-countdown-component';
// @ts-ignore
import Dash from 'react-native-dash';
import { DotIndicator } from 'react-native-indicators';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Header } from '../../components';
import { tokenService } from '../../services';
import { setIsLoggedIn } from '../../store/actions';
import { IReduxState } from '../../store/store';
import { axiosInstance, globalStyles, setRecoveryPass } from '../../utils';
import { IS_SMALL_HEIGHT } from '../../utils/constants';
import styles from '../styles';

interface IProps {
  readonly email: string;
  readonly setIsLoggedIn: () => void;
}

class SigninConfirmCode extends PureComponent<IProps> {
  public readonly state = {
    hasError: false,
    isSendingRequest: false,
    isValid: false,
    wasSentAgain: false,
  };

  private onCodeFilled = async (code: string) => {
    try {
      const { data } = await axiosInstance.post('/tempPassword/validate', { employeeEmail: this.props.email, password: code });

      if (!data.token) {
        return this.setState({ hasError: true });
      }

      await tokenService.setToken(data.token);
      await this.props.setIsLoggedIn();
      return Actions.push('sign_in_new_password');
    } catch (e) {
      console.log(e);
      this.setState({ hasError: true });
    }
  };

  private disableCountDown = () => {
    this.setState({ wasSentAgain: false });
  };

  private sendSmsAgain = () => {
    this.setState({ isSendingRequest: true }, async () => {
      return this.sendVerificationCode();
    });
  };

  private async sendVerificationCode() {
    try {
      await setRecoveryPass(this.props.email);
    } catch (e) {
      Alert.alert('Something went wrong');
    } finally {
      this.setState({ isSendingRequest: false, wasSentAgain: true });
    }
  }

  private renderFooter() {
    const { isSendingRequest, isValid, wasSentAgain } = this.state;

    if (isSendingRequest || isValid) {
      return (
        <View style={[styles.confirm_code.confirmation_info_footer, { bottom: 0 }]}>
          <View style={styles.confirm_code.confirmation_loader}>
            <DotIndicator count={3} size={10} color={'rgba(255, 255, 255, 0.56)'}/>
          </View>
        </View>
      );
    }

    if (wasSentAgain) {
      return (
        <View style={[styles.confirm_code.confirmation_info_footer, { bottom: 22 }]}>
          <Text style={styles.confirm_code.confirmation_info_didnt_receive}>
            <FormattedMessage id={'code_confirmation_send_again_message'}/>
          </Text>
          <View style={styles.confirm_code.confirmation_countdown_container}>
            <CountDown
              style={{ marginTop: 4 }}
              size={9}
              until={23}
              onFinish={this.disableCountDown}
              timeToShow={['S']}
              digitStyle={{ backgroundColor: 'transparent' }}
              digitTxtStyle={styles.confirm_code.confirmation_countdown_text}
              timeLabels={{ s: '' }}
            />
            <Text style={styles.confirm_code.confirmation_send_again}>
              <FormattedMessage id={'code_confirmation_send_again_second'}/>
            </Text>
          </View>
        </View>
      );
    }

    return (
      <View style={[styles.confirm_code.confirmation_info_footer, { bottom: 19 }]}>
        <Text style={styles.confirm_code.confirmation_info_didnt_receive}>
          <FormattedMessage id={'code_confirmation_sms_not'}/>
        </Text>
        <Button onPress={this.sendSmsAgain} transparent={true} style={{ height: 'auto' }}>
          <View>
            <Text style={styles.confirm_code.confirmation_send_again}>
              <FormattedMessage id={'code_confirmation_send_again'}/>
            </Text>
            <Dash style={{ width: '100%', height: 1, marginTop: 2 }} dashColor={globalStyles.colors.purple}/>
          </View>
        </Button>
      </View>
    );
  }

  public render() {
    const { hasError } = this.state;
    return (
      <View style={styles.common.container}>
        <Header/>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={[styles.common.inner_container, { flex: 1, position: 'relative' }]}>
            <Text style={styles.common.top_title}>
              <FormattedMessage id={'signin_recovery_title'}/>
            </Text>
            <Text style={styles.password_recovery.description}>
              <FormattedMessage id={'signin_recovery_description_input'}/>
            </Text>
            <View style={{ marginTop: IS_SMALL_HEIGHT ? 15 : 52 }}>
              {hasError && (
                <Text style={styles.confirm_code.confirmation_wrong_code}>
                  <FormattedMessage id={'signin_recovery_wrong_code'}/>
                </Text>
              )}
              <CodeInput
                autoFocus={false}
                keyboardType={'numeric'}
                codeLength={4}
                onFulfill={this.onCodeFilled}
                space={16}
                codeInputStyle={styles.confirm_code.confirmation_code_input_style}
              />
            </View>
            {this.renderFooter()}
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<IReduxState, void, Action>) => {
  return {
    setIsLoggedIn: (callbackFirst?: () => void, callbackSecond?: () => void) => dispatch(setIsLoggedIn(callbackFirst, callbackSecond))
  };
};

export default connect(null, mapDispatchToProps)(SigninConfirmCode);