import debounce from 'lodash/debounce';
import { Button, Item } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Alert, Dimensions, Image, SafeAreaView, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { EmailInput, Header, NextButton, PasswordInput } from '../../components';
import { tokenService } from '../../services';
import { setIsLoggedIn } from '../../store/actions';
import { IReduxState } from '../../store/store';
import { axiosInstance, validateEmail } from '../../utils';
import { IS_SMALL_HEIGHT } from '../../utils/constants';
import styles from '../styles';

interface IProps {
  readonly setIsLoggedIn: (callbackFirst?: () => void, callbackSecond?: () => void) => void;
}

class SignInInitial extends PureComponent<IProps> {
  public readonly state = {
    email: '',
    password: '',
    errorMessage: '',
    isLoading: false,
    headerHeight: 0
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
        const { data } = await axiosInstance.post('/login', { email: this.state.email, password: this.state.password });

        if (!data.token) {
          return this.setState({ errorMessage: 'incorrect_email_pass' });
        }

        await tokenService.setToken(data.token);
        await this.props.setIsLoggedIn(
          async () => {
            this.setState({ errorMessage: 'not_signed_up_error' });
            await tokenService.removeToken();
            await this.props.setIsLoggedIn();
          },
          () => Actions.reset('main_dashboard'));
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

  private navigateTo = (to: string, popTo?: boolean) => {
    if (popTo) {
      return Actions.popTo(to);
    }

    return Actions.push(to);
  };

  private onSignUpPress = debounce(() => this.navigateTo('signup_email_pass', true), 1000, { leading: true, trailing: false });
  private onForgotPress = debounce(() => this.navigateTo('sign_in_recover_password'), 1000, { leading: true, trailing: false });

  private onNextPress = debounce(this.onSubmit, 1000, { leading: true, trailing: false });

  public render() {
    const { errorMessage } = this.state;

    return (
      <KeyboardAwareScrollView style={styles.common.container} scrollEnabled={false}>
        <Header onLayout={(height: number) => this.setState({ headerHeight: height })}/>
        <SafeAreaView style={{ height: Dimensions.get('window').height - this.state.headerHeight }}>
          <View style={styles.common.inner_container}>
            <Text style={styles.common.top_title}>
              <FormattedMessage id={'signin_title'}/>
            </Text>
            <Item rounded={true} style={[styles.common.input_container, { marginTop: 32 }]}>
              <Image source={require('../../assets/images/icons/email.png')} style={[styles.email_pass.icon, { width: 25, height: 14 }]}/>
              <EmailInput style={styles.common.input} email={this.state.email} onChange={e => this.onChange(e, 'email')}/>
            </Item>
            <Item rounded={true} style={[styles.common.input_container, { marginTop: 40 }]}>
              <Image source={require('../../assets/images/icons/password.png')} style={[styles.email_pass.icon, { width: 25, height: 19 }]}/>
              <PasswordInput
                placeholder={'signin_password'}
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
            <Button
              transparent={true}
              style={[styles.sign_in.forgot_button, { marginTop: errorMessage ? 12 : IS_SMALL_HEIGHT ? 20 : 40 }]}
              onPress={this.onForgotPress}
            >
              <Text style={styles.sign_in.forgot_button_text}>
                <FormattedMessage id={'signin_forgot_title'}/>
              </Text>
            </Button>
            <NextButton buttonStyle={{ marginTop: 40 }} onPress={this.onNextPress} disabled={this.state.isLoading}/>
          </View>
          <View style={[styles.common.bottom_button, { bottom: IS_SMALL_HEIGHT ? 10 : 30 }]}>
            <Button transparent={true} onPress={this.onSignUpPress} disabled={this.state.isLoading}>
              <Text style={styles.common.bottom_button_text}>
                <FormattedMessage id={'signin_create_account_prefix'}/> {' '}
              </Text>
              <Text style={styles.common.bottom_button_bold}>
                <FormattedMessage id={'signin_create_account_suffix'}/>
              </Text>
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

export default connect(null, mapDispatchToProps)(SignInInitial);