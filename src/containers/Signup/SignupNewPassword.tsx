import debounce from 'lodash/debounce';
import { Button, Item } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Image, SafeAreaView, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Header, LoaderIndicator, NextButton, PasswordInput } from '../../components';
import { IReduxState } from '../../store/store';
import { axiosInstance, IUser } from '../../utils';
import styles from '../styles';

interface IProps {
  readonly user: IUser;
  readonly isLoggedIn: boolean | undefined;
}

class SignupNewPassword extends PureComponent<IProps> {
  public readonly state = {
    password: '',
    confirmPassword: '',
    errorMessage: ''
  };

  public componentDidMount(): void {
    if (this.props.user && this.props.user.setupComplete) {
      return Actions.reset('main_dashboard');
    }

    if (this.props.isLoggedIn) {
      return Actions.reset('main_dashboard');
    }
  }

  public componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any): void {
    if (prevProps.user.setupComplete !== this.props.user.setupComplete && this.props.user.setupComplete) {
      Actions.reset('main_dashboard');
    }
  }

  private onChange = (val: string, key: string) => {
    this.setState({ [key]: val, errorMessage: '' });
  };

  private onSubmit = async () => {
    const { password, confirmPassword } = this.state;
    if (!password.trim().length || !confirmPassword.trim().length) {
      return this.setState({ errorMessage: 'signin_recover_password_empty_fields' });
    }

    if (password !== confirmPassword) {
      return this.setState({ errorMessage: 'signin_recover_password_not_corresponding' });
    }

    try {
      const { data } = await axiosInstance.post('/user/me', { password });

      if (data.errors) {
        return this.setState({ errorMessage: 'unhandled_error' });
      }

      return Actions.push('signup_paypal');
    } catch (err) {
      this.setState({ errorMessage: 'unhandled_error' });
    }
  };

  private navigateToSignin = () => {
    return Actions.push('sign_in_initial');
  };

  private onSignInPress = debounce(this.navigateToSignin, 1000, { leading: true, trailing: false });

  private onSubmitPress = debounce(this.onSubmit, 1000, { leading: true, trailing: false });

  public render() {
    const { errorMessage } = this.state;
    const { user } = this.props;

    if (!user || !user.email) {
      return <LoaderIndicator/>;
    }

    return (
      <View style={styles.common.container}>
        <Header/>
        <SafeAreaView style={{ flex: 1 }}>
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
            <NextButton onPress={this.onSubmitPress} title={'submit_button'} buttonStyle={{ marginTop: !errorMessage ? 46 : 26 }}/>
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

const mapStateToProps = ({ settings }: IReduxState) => {
  return {
    user: settings.user,
    isLoggedIn: settings.isLoggedIn
  };
};

export default connect(mapStateToProps)(SignupNewPassword);