import debounce from 'lodash/debounce';
import { Item } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Image, SafeAreaView, Text, View } from 'react-native';
import { EmailInput, Header, NextButton } from '../../components';
import styles from '../styles';
import { validateEmail } from '../../utils';

class SigninRecoverPassword extends PureComponent {
  public readonly state = {
    email: '',
    errorMessage: ''
  };

  private onSubmit = () => {
    if (!validateEmail(this.state.email)) {
      return this.setState({ errorMessage: 'incorrect_email' });
    }

    // if (!validateEmail(this.state.email)) {
    //   return this.setState({ errorMessage: 'signin_recovery_error' });
    // }
  };

  private onNextPress = debounce(this.onSubmit, 1000, { leading: true, trailing: false });

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
            <Text style={styles.password_recovery.description}>
              <FormattedMessage id={'signin_recovery_description'}/>
            </Text>
            <Item rounded={true} style={[styles.common.input_container, { marginTop: 32 }]}>
              <Image source={require('../../assets/images/icons/email.png')} style={[styles.email_pass.icon, { width: 25, height: 14 }]}/>
              <EmailInput email={this.state.email} onChange={(e) => this.setState({ email: e, errorMessage: '' })} style={styles.common.input}/>
            </Item>
            {errorMessage ? (
              <Text style={styles.common.email_pass_error}>
                <FormattedMessage id={this.state.errorMessage}/>
              </Text>
            ) : null}
            <NextButton onPress={this.onNextPress} title={'submit_button'} buttonStyle={{ marginTop: !errorMessage ? 64 : 36 }}/>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default SigninRecoverPassword;