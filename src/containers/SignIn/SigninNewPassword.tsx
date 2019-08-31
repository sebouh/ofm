import debounce from 'lodash/debounce';
import { Item } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Alert, Image, SafeAreaView, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Header, NextButton, PasswordInput } from '../../components';
import { axiosInstance } from '../../utils';
import styles from '../styles';

class SigninNewPassword extends PureComponent {
  public readonly state = {
    password: '',
    confirmPassword: '',
    errorMessage: '',
    isLoading: false
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

        return Actions.reset('main_dashboard');
      } catch (e) {
        if (e.message === 'internet') {
          return Alert.alert('Please check internet connection and try again');
        }

        return this.setState({ errorMessage: 'unhandled_error' });
      } finally {
        this.setState({ isLoading: false });
      }
    });
  };

  private onSubmitPress = debounce(this.onSubmit, 1000, { leading: true, trailing: false });

  public render() {
    const { errorMessage } = this.state;

    return (
      <View style={styles.common.container}>
        <Header/>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.common.inner_container}>
            <Text style={styles.common.top_title}>
              <FormattedMessage id={'signin_recovery_title'}/>
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
        </SafeAreaView>
      </View>
    );
  }
}

export default SigninNewPassword;