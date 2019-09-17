import debounce from 'lodash/debounce';
import { Button, Item } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Alert, Dimensions, Image, SafeAreaView, Text, View } from 'react-native';
// @ts-ignore
import Dash from 'react-native-dash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { EmailInput, Header, NextButton, PasswordInput } from '../../components';
import { tokenService } from '../../services';
import { setIsLoggedIn } from '../../store/actions';
import { IReduxState } from '../../store/store';
import { axiosInstance, globalStyles, validateEmail } from '../../utils';
import { IS_SMALL_HEIGHT } from '../../utils/constants';
import styles from '../styles';

interface IProps {
  readonly setIsLoggedIn: (callbackFirst?: () => void, callbackSecond?: () => void) => void;
}

class SignupEmailPassword extends PureComponent<IProps> {
  public readonly state = {
    email: '',
    password: '',
    errorMessage: '',
    isLoading: false,
    headerHeight: 0,
    policyWidth: 100
  };

  private onChange = (val: string, key: string) => {
    this.setState({ [key]: val, errorMessage: '' });
  };

  private onSubmit = async () => {
    if (!validateEmail(this.state.email) || !this.state.password) {
      return this.setState({ errorMessage: 'incorrect_email_pass' });
    }

    this.setState({ isLoading: true }, async () => {
      try {
        const { data: signup } = await axiosInstance.post('/login', { email: this.state.email, password: this.state.password });

        if (!signup.token) {
          return this.setState({ errorMessage: 'incorrect_email_pass' });
        }

        await tokenService.setToken(signup.token);
        await this.props.setIsLoggedIn(() => Actions.push('signup_new_password'), async () => {
          this.setState({ errorMessage: 'already_signed_up_error' });
          await tokenService.removeToken();
          await this.props.setIsLoggedIn();
        });
      } catch (err) {
        if (err.message === 'internet') {
          return Alert.alert('Please check internet connection and try again');
        }

        console.log(err);
        return this.setState({ errorMessage: 'incorrect_email_pass' });
      } finally {
        this.setState({ isLoading: false });
      }
    });
  };

  private navigateToSignin = () => {
    return Actions.push('sign_in_initial');
  };

  private navigateToPrivacy = () => {
    return Actions.push('privacy_policy');
  };

  private onSignInPress = debounce(this.navigateToSignin, 1000, { leading: true, trailing: false });
  private onPrivacyPress = debounce(this.navigateToPrivacy, 1000, { leading: true, trailing: false });

  private onNextPress = debounce(this.onSubmit, 1000, { leading: true, trailing: false });

  public render() {
    const { errorMessage } = this.state;
    return (
      <KeyboardAwareScrollView style={styles.common.container} scrollEnabled={false}>
        <Header onLayout={(height: number) => this.setState({ headerHeight: height })}/>
        <SafeAreaView style={{ height: Dimensions.get('window').height - this.state.headerHeight }}>
          <View style={styles.common.inner_container}>
            <Text style={styles.common.top_title}>
              <FormattedMessage id={'signup_title'}/>
            </Text>
            <Item rounded={true} style={[styles.common.input_container, { marginTop: 32 }]}>
              <Image source={require('../../assets/images/icons/email.png')} style={[styles.email_pass.icon, { width: 30, height: 14 }]}/>
              <EmailInput
                style={styles.common.input}
                email={this.state.email}
                onChange={e => this.onChange(e, 'email')}
              />
            </Item>
            <Item rounded={true} style={[styles.common.input_container, { marginTop: 40 }]}>
              <Image source={require('../../assets/images/icons/temp_pass.png')} style={[styles.email_pass.icon, { width: 30, height: 20 }]}/>
              <PasswordInput
                placeholder={'signup_temp_password'}
                style={styles.common.input}
                value={this.state.password}
                onChange={e => this.onChange(e, 'password')}
              />
            </Item>
            {errorMessage ? (
              <Text style={styles.common.email_pass_error}>
                <FormattedMessage id={this.state.errorMessage}/>
              </Text>
            ) : null}
            <NextButton
              disabled={this.state.isLoading}
              buttonStyle={{ marginTop: !errorMessage ? 64 : IS_SMALL_HEIGHT ? 10 : 36 }}
              onPress={this.onNextPress}
            />
          </View>
          <View style={styles.common.bottom_button}>
            <Button transparent={true} onPress={this.onSignInPress} disabled={this.state.isLoading}>
              <Text style={styles.common.bottom_button_text}>
                <FormattedMessage id={'signup_login_prefix'}/> {' '}
                <Text style={styles.common.bottom_button_bold}>
                  <FormattedMessage id={'signup_login_suffix'}/>
                </Text>
              </Text>
            </Button>
            <Button
              transparent={true}
              onPress={this.onPrivacyPress}
              disabled={this.state.isLoading}
              style={{ height: 'auto', flexDirection: 'column' }}
            >
              <Text style={styles.common.bottom_button_text} onLayout={e => this.setState({ policyWidth: e.nativeEvent.layout.width })}>
                <FormattedMessage id={'menu_privacy'}/>
              </Text>
              <Dash style={{ width: this.state.policyWidth, height: 1, marginTop: 2 }} dashColor={globalStyles.colors.black}/>
            </Button>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<IReduxState, void, Action>) => {
  return {
    setIsLoggedIn: (callbackFirst?: () => void, callbackSecond?: () => void) => dispatch(setIsLoggedIn(callbackFirst, callbackSecond))
  };
};

export default connect(null, mapDispatchToProps)(SignupEmailPassword);