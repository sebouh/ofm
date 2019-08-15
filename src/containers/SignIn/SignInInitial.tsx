import debounce from 'lodash/debounce';
import { Button, Item } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Image, SafeAreaView, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { EmailInput, Header, NextButton, PasswordInput } from '../../components';
import styles from '../styles';

class SignInInitial extends PureComponent {
  public readonly state = {
    email: '',
    password: ''
  };

  private onChange = (val: string, key: string) => {
    this.setState({ [key]: val });
  };

  private navigateToSignup = () => {
    Actions.popTo('signup_email_pass');
  };

  private onSignUpPress = debounce(this.navigateToSignup, 1000, { leading: true, trailing: false });

  public render() {
    return (
      <View style={styles.common.container}>
        <Header/>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.email_pass.inner_container}>
            <Text style={styles.email_pass.title}>
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
            <Button transparent={true} style={styles.sign_in.forgot_button}>
              <Text style={styles.sign_in.forgot_button_text}>
                <FormattedMessage id={'signin_forgot_title'}/>
              </Text>
            </Button>
            <NextButton buttonStyle={{ marginTop: 40 }}/>
          </View>
          <View style={[styles.common.bottom_button, { bottom: 30 }]}>
            <Button transparent={true} onPress={this.onSignUpPress}>
              <Text style={styles.common.bottom_button_text}>
                <FormattedMessage id={'signin_create_account_prefix'}/> {' '}
              </Text>
              <Text style={styles.common.bottom_button_bold}>
                <FormattedMessage id={'signin_create_account_suffix'}/>
              </Text>
            </Button>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default SignInInitial;