import debounce from 'lodash/debounce';
import { Button, Item } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Dimensions, Image, SafeAreaView, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
import { EmailInput, Header, NextButton } from '../../components';
import { axiosInstance, validateEmail } from '../../utils';
import styles from '../styles';

class SignupPaypalEmail extends PureComponent {
  public readonly state = {
    email: '',
    errorMessage: '',
    isLoading: false,
    headerHeight: 0
  };

  private onChange = (val: string, key: string) => {
    this.setState({ [key]: val, errorMessage: '' });
  };

  private navigateToSignin = () => {
    return Actions.push('sign_in_initial');
  };

  private onSubmit = () => {
    const { email } = this.state;

    if (!validateEmail(email)) {
      return this.setState({ errorMessage: 'incorrect_email' });
    }

    this.setState({ isLoading: true }, async () => {
      try {
        const { data } = await axiosInstance.post('/user/me', { paypalEmail: email });

        if (data.errors) {
          return this.setState({ errorMessage: 'unhandled_error' });
        }

        return Actions.reset('main_dashboard');
      } catch (err) {
        this.setState({ errorMessage: 'unhandled_error' });
      } finally {
        this.setState({ isLoading: false });
      }
    });
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
            <Item rounded={true} style={[styles.common.input_container, { marginTop: 60 }]}>
              <Image source={require('../../assets/images/icons/email.png')} style={[styles.email_pass.icon, { width: 30, height: 14 }]}/>
              <EmailInput
                style={styles.common.input}
                email={this.state.email}
                onChange={e => this.onChange(e, 'email')}
                placeholder={'paypal_email'}
              />
            </Item>
            {errorMessage ? (
              <Text style={styles.common.email_pass_error}>
                <FormattedMessage id={this.state.errorMessage}/>
              </Text>
            ) : null}
            <NextButton
              disabled={this.state.isLoading}
              buttonStyle={{ marginTop: !errorMessage ? 126 : 36 }}
              title={'submit_button'}
              onPress={this.onSubmitPress}
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

export default SignupPaypalEmail;