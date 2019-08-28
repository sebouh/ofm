import debounce from 'lodash/debounce';
import { Button, Item } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Alert, Dimensions, Image, SafeAreaView, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
import { Header, NextButton, PasswordInput } from '../../components';
import { axiosInstance } from '../../utils';
import styles from '../styles';

class SignupNewPassword extends PureComponent {
  public readonly state = {
    password: '',
    confirmPassword: '',
    errorMessage: '',
    isLoading: false,
    headerHeight: 0
  };

  private onChange = (val: string, key: string) => {
    this.setState({ [key]: val, errorMessage: '' });
  };

  private onSubmit = () => {
    const { password, confirmPassword } = this.state;
    if (!password.trim().length || !confirmPassword.trim().length) {
      return this.setState({ errorMessage: 'signin_recover_password_empty_fields' });
    }

    if (password !== confirmPassword) {
      return this.setState({ errorMessage: 'signin_recover_password_not_corresponding' });
    }

    this.setState({ isLoading: true }, async () => {
      try {
        const { data } = await axiosInstance.post('/user/me', { password });

        if (data.errors) {
          if (data.errors.length) {
            return Alert.alert(data.errors[0]);
          }

          return this.setState({ errorMessage: 'unhandled_error' });
        }

        return Actions.push('signup_paypal');
      } catch (err) {
        this.setState({ errorMessage: 'unhandled_error' });
      } finally {
        this.setState({ isLoading: true });
      }
    });
  };

  private navigateToSignin = () => {
    return Actions.push('sign_in_initial');
  };

  private onSignInPress = debounce(this.navigateToSignin, 1000, { leading: true, trailing: false });

  private onSubmitPress = debounce(this.onSubmit, 1000, { leading: true, trailing: false });

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
              <Image source={require('../../assets/images/icons/password.png')} style={[styles.email_pass.icon, { width: 25, height: 19 }]}/>
              <PasswordInput
                placeholder={'signin_recover_password_input_one'}
                style={styles.common.input}
                value={this.state.password}
                onChange={e => this.onChange(e, 'password')}
              />
            </Item>
            <Item rounded={true} style={[styles.common.input_container, { marginTop: 32 }]}>
              <Image source={require('../../assets/images/icons/password.png')} style={[styles.email_pass.icon, { width: 25, height: 19 }]}/>
              <PasswordInput
                placeholder={'signin_recover_password_input_two'}
                style={styles.common.input}
                value={this.state.confirmPassword}
                onChange={e => this.onChange(e, 'confirmPassword')}
              />
            </Item>
            {errorMessage ? (
              <Text style={styles.common.email_pass_error}>
                <FormattedMessage id={this.state.errorMessage}/>
              </Text>
            ) : null}
            <NextButton
              disabled={this.state.isLoading}
              onPress={this.onSubmitPress}
              title={'submit_button'}
              buttonStyle={{ marginTop: !errorMessage ? 46 : 26 }}
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
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  }
}

export default SignupNewPassword;