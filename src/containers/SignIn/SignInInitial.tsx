import { Item } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Image, SafeAreaView, Text, View } from 'react-native';
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
              <EmailInput style={styles.common.input} email={this.state.email} onChange={e => this.onChange(e, 'email')} />
            </Item>
            <Item rounded={true} style={[styles.common.input_container, { marginTop: 40 }]}>
              <Image source={require('../../assets/images/icons/password.png')} style={[styles.email_pass.icon, { width: 25, height: 19 }]} />
              <PasswordInput
                placeholder={'signin_password'}
                style={styles.common.input}
                value={this.state.password}
                onChange={e => this.onChange(e, 'password')}
              />
            </Item>
            <NextButton buttonStyle={{ marginTop: 40 }} />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default SignInInitial;