import debounce from 'lodash/debounce';
import { Item } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Alert, BackHandler, Image, SafeAreaView, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Header, NextButton, PasswordInput } from '../../components';
import { tokenService } from '../../services';
import { setIsLoggedIn } from '../../store/actions';
import { IReduxState } from '../../store/store';
import { axiosInstance, passwordValidator } from '../../utils';
import styles from '../styles';

interface IProps {
  readonly setIsLoggedIn: () => void;
}

class SigninNewPassword extends PureComponent<IProps> {
  public readonly state = {
    password: '',
    confirmPassword: '',
    errorMessage: '',
    isLoading: false
  };

  public componentDidMount(): void {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  public componentWillUnmount(): void {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  private onBackPress = async () => {
    await this.logout(false);
    Actions.popTo('sign_in_initial');
    return true;
  };

  private onChange = (val: string, key: string) => {
    this.setState({ [key]: val, errorMessage: '' });
  };

  private onSubmit = () => {
    const { password, confirmPassword } = this.state;
    const errorMessage = passwordValidator(password, confirmPassword);

    if (errorMessage) {
      return this.setState({ errorMessage });
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

  private logout = async (redirect: boolean = true) => {
    await tokenService.removeToken();
    this.props.setIsLoggedIn();

    if (redirect) {
      Actions.popTo('sign_in_initial');
    }
  };

  private onSubmitPress = debounce(this.onSubmit, 1000, { leading: true, trailing: false });

  public render() {
    const { errorMessage } = this.state;

    return (
      <View style={styles.common.container}>
        <Header onBackPress={() => this.logout(true)}/>
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

const mapDispatchToProps = (dispatch: ThunkDispatch<IReduxState, void, Action>) => {
  return {
    setIsLoggedIn: () => dispatch(setIsLoggedIn()),
  };
};

export default connect(null, mapDispatchToProps)(SigninNewPassword);