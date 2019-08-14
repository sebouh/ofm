import { Button, Item } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Image, SafeAreaView, Text, View } from 'react-native';
import { EmailInput, Header, NextButton, PasswordInput } from '../../components';
import styles from '../styles';

class SignupEmailPassword extends PureComponent {
  public readonly state = {
    email: '',
    password: ''
  };

  private onChange = (val: string, key: string) => {
    this.setState({ [key]: val });
  };

  public render() {
    return (
      <View style={styles.common.container}>
        <Header/>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.email_pass.inner_container}>
            <Text style={styles.email_pass.title}>
              <FormattedMessage id={'signup_title'}/>
            </Text>
            <Item rounded={true} style={[styles.common.input_container, { marginTop: 32 }]}>
              <Image source={require('../../assets/images/icons/email.png')} style={[styles.email_pass.icon, { width: 25, height: 14 }]}/>
              <EmailInput
                style={styles.common.input}
                email={this.state.email}
                onChange={e => this.onChange(e, 'email')}
              />
            </Item>
            <Item rounded={true} style={[styles.common.input_container, { marginTop: 40 }]}>
              <Image source={require('../../assets/images/icons/temp_pass.png')} style={[styles.email_pass.icon, { width: 25, height: 19 }]}/>
              <PasswordInput
                placeholder={'signup_temp_password'}
                style={styles.common.input}
                value={this.state.password}
                onChange={e => this.onChange(e, 'password')}
              />
            </Item>
            <NextButton buttonStyle={{ marginTop: 64 }} />
          </View>
          <View style={styles.email_pass.sign_in}>
            <Button transparent={true}>
              <Text style={styles.email_pass.sign_in_text}>
                <FormattedMessage id={'signup_login_orefix'}/> {' '}
                <Text style={styles.email_pass.sign_in_text_bold}>
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