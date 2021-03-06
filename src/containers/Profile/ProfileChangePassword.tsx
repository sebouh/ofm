import debounce from 'lodash/debounce';
import { Button, Item } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Alert, Image, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Header, PasswordInput, SubHeader } from '../../components';
import { eventEmitter } from '../../services';
import { setModalConfigs } from '../../store/actions';
import { IReduxState } from '../../store/store';
import { axiosInstance, IModalConfigs, passwordValidator } from '../../utils';
import { emitterEvents } from '../../utils/constants';
import styles from '../styles';

interface IProps {
  readonly email: string;
  readonly setModalConfigs: (config: IModalConfigs) => void;
}

class ProfileChangePassword extends PureComponent<IProps> {
  public readonly state = {
    oldPass: '',
    newPass: '',
    newPassConfirm: '',
    errorMessage: '',
    isLoading: false
  };

  public componentDidMount(): void {
    eventEmitter.on(emitterEvents.on_password_change_modal_close, this.onPasswordChangeModalClose);
  }

  public componentWillUnmount(): void {
    eventEmitter.removeEventListener(emitterEvents.on_password_change_modal_close, this.onPasswordChangeModalClose);
  }

  private onPasswordChangeModalClose = () => {
    setTimeout(() => Actions.pop(), 300);
  };

  private onChange = (val: string, key: string) => {
    this.setState({ [key]: val, errorMessage: '' });
  };

  private onSubmit = () => {
    const { oldPass, newPass, newPassConfirm } = this.state;
    if (!oldPass.trim().length || !newPass.trim().length || !newPassConfirm.trim().length) {
      return this.setState({ errorMessage: 'profile_new_pass_empty_fields' });
    }

    const errorMessage = passwordValidator(newPass, newPassConfirm);

    if (errorMessage) {
      return this.setState({ errorMessage });
    }

    this.setState({ isLoading: true }, async () => {
      try {
        const { data } = await axiosInstance.post('/login', { email: this.props.email, password: oldPass });

        if (!data.token) {
          return this.setState({ errorMessage: 'profile_incorrect_old_pass' });
        }

        const { data: newData } = await axiosInstance.post('/user/me', { password: newPass });

        if (newData.errors) {
          if (newData.errors.length) {
            return Alert.alert(newData.errors[0]);
          }

          return this.setState({ errorMessage: 'unhandled_error' });
        }

        return this.props.setModalConfigs({
          isVisible: true,
          title: 'modal_success_title',
          confirm: false,
          icon: 'success',
          message: 'profile_new_pass_success_message',
          event: emitterEvents.on_password_change_modal_close
        });

      } catch (err) {
        if (err.message === 'internet') {
          return Alert.alert('Please check internet connection and try again');
        }

        let message = 'profile_incorrect_old_pass';

        if (err && err.response && err.response.status === 401) {
          message = 'authorization_error';
        }

        return this.setState({ errorMessage: message });
      } finally {
        this.setState({ isLoading: false });
      }
    });
  };

  private onSubmitPress = debounce(this.onSubmit, 1000, { leading: true, trailing: false });

  public render() {
    return (
      <View style={styles.redeem_initial.container}>
        <Header/>
        <SubHeader title={'profile_initial_change_pass'}/>
        <KeyboardAwareScrollView style={styles.profile_initial.container}>
          <Text style={styles.profile_initial.label}>
            <FormattedMessage id={'profile_pass_old_title'}/>
          </Text>
          <Item>
            <Image source={require('../../assets/images/icons/password.png')} style={{ marginTop: 5, width: 25, height: 19 }}/>
            <PasswordInput
              onChange={e => this.onChange(e, 'oldPass')}
              style={styles.common.input}
              value={this.state.oldPass}
              hidePlaceHolder={true}
            />
          </Item>
          <Text style={styles.profile_initial.label}>
            <FormattedMessage id={'profile_new_pass_title'}/>
          </Text>
          <Item>
            <Image source={require('../../assets/images/icons/password.png')} style={{ marginTop: 5, width: 25, height: 19 }}/>
            <PasswordInput
              onChange={e => this.onChange(e, 'newPass')}
              style={styles.common.input}
              value={this.state.newPass}
              hidePlaceHolder={true}
            />
          </Item>
          <Text style={styles.profile_initial.label}>
            <FormattedMessage id={'profile_new_pass_confirm_title'}/>
          </Text>
          <Item>
            <Image source={require('../../assets/images/icons/password.png')} style={{ marginTop: 5, width: 25, height: 19 }}/>
            <PasswordInput
              onChange={e => this.onChange(e, 'newPassConfirm')}
              style={styles.common.input}
              value={this.state.newPassConfirm}
              hidePlaceHolder={true}
            />
          </Item>
          {this.state.errorMessage ? (
            <Text style={styles.common.email_pass_error}>
              <FormattedMessage id={this.state.errorMessage}/>
            </Text>
          ) : null}
          <Button disabled={this.state.isLoading} rounded={true} bordered={true} style={styles.profile_initial.save_button} onPress={this.onSubmitPress}>
            <Text style={styles.profile_initial.save_button_text}>
              <FormattedMessage id={'profile_initial_save'}/>
            </Text>
          </Button>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ settings }: IReduxState) => {
  return {
    email: settings.user.email
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IReduxState, void, Action>) => {
  return {
    setModalConfigs: (config: IModalConfigs) => dispatch(setModalConfigs(config)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileChangePassword);