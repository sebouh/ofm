import debounce from 'lodash/debounce';
import { Button, Item } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Image, SafeAreaView, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { EmailInput, Header, NextButton, PasswordInput } from '../../components';
import { validateEmail } from '../../utils';
import styles from '../styles';

class SignupEmailPassword extends PureComponent {
  public readonly state = {
    email: '',
    password: '',
    errorMessage: ''
  };

  private onChange = (val: string, key: string) => {
    this.setState({ [key]: val, errorMessage: '' });
  };

  private onSubmit = () => {
    if (!validateEmail(this.state.email) || !this.state.password) {
      return this.setState({ errorMessage: 'incorrect_email_pass' });
    }
  };

  private navigateToSignin = () => {
    return Actions.push('sign_in_initial');
  };

  private onSignInPress = debounce(this.navigateToSignin, 1000, { leading: true, trailing: false });

  private onNextPress = debounce(this.onSubmit, 1000, { leading: true, trailing: false });

  public render() {
    const { errorMessage } = this.state;
    return (
      <View style={styles.common.container}>
        <Header/>
        <SafeAreaView style={{ flex: 1 }}>
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
            <NextButton buttonStyle={{ marginTop: !errorMessage ? 64 : 36 }} onPress={this.onNextPress}/>
          </View>
          <View style={styles.common.bottom_button}>
            <Button transparent={true} onPress={this.onSignInPress}>
              <Text style={styles.common.bottom_button_text}>
                <FormattedMessage id={'signup_login_prefix'}/> {' '}
                <Text style={styles.common.bottom_button_bold}>
                  <FormattedMessage id={'signup_login_suffix'}/>
                </Text>
              </Text>
            </Button>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default SignupEmailPassword;