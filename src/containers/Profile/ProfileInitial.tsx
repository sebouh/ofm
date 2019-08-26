import debounce from 'lodash/debounce';
import { Button, Item } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Alert, Image, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { EmailInput, Header, SubHeader } from '../../components';
import { getCurrentUser, setModalConfigs } from '../../store/actions';
import { IReduxState } from '../../store/store';
import { axiosInstance, IModalConfigs, validateEmail } from '../../utils';
import styles from '../styles';

interface IProps {
  readonly email: string;
  readonly paypalEmail: string | null;
  readonly setModalConfigs: (config: IModalConfigs) => void;
  readonly getCurrentUser: () => void;
}

class ProfileInitial extends PureComponent<IProps> {
  public readonly state = {
    email: this.props.email,
    paypalEmail: this.props.paypalEmail,
    errorMessage: ''
  };

  public componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IProps>, snapshot?: any): void {
    const newState = { ...this.state };
    if (prevProps.paypalEmail !== this.props.paypalEmail) {
      newState.paypalEmail = this.props.paypalEmail;
    }

    if (prevProps.email !== this.props.email) {
      newState.email = this.props.email;
    }

    if (newState.email !== this.state.email || newState.paypalEmail !== this.state.paypalEmail) {
      this.setState(newState);
    }
  }

  private onChange = (val: string, key: string) => {
    this.setState({ [key]: val, errorMessage: '' });
  };

  private onSubmit = async () => {
    const { email, paypalEmail } = this.state;

    if (!validateEmail(email) || !paypalEmail) {
      return this.setState({ errorMessage: 'incorrect_email' });
    }

    if (email === this.props.email && paypalEmail === this.props.paypalEmail) {
      return this.props.setModalConfigs({
        isVisible: true,
        title: 'modal_success_title',
        confirm: false,
        icon: 'success',
        message: 'profile_initial_save_message',
      });
    }

    try {
      const { data } = await axiosInstance.post('/user/me', { email, paypalEmail });

      if (data.errors) {
        if (data.errors.length) {
          return Alert.alert(data.errors[0]);
        }

        return this.setState({ errorMessage: 'unhandled_error' });
      }

      this.props.getCurrentUser();

      this.props.setModalConfigs({
        isVisible: true,
        title: 'modal_success_title',
        confirm: false,
        icon: 'success',
        message: 'profile_initial_save_message',
      });
    } catch (err) {
      this.setState({ errorMessage: 'unhandled_error' });
    }
  };

  private onChangePress = debounce(() => Actions.push('profile_change_pass'), 1000, { leading: true, trailing: false });

  private onSubmitPress = debounce(this.onSubmit, 1000, { leading: true, trailing: false });

  public render() {
    return (
      <View style={styles.redeem_initial.container}>
        <Header/>
        <SubHeader title={'profile_title'}/>
        <View style={styles.profile_initial.container}>
          <Text style={styles.profile_initial.label}>
            <FormattedMessage id={'email'}/>
          </Text>
          <Item>
            <Image source={require('../../assets/images/icons/email.png')} style={{ marginTop: 5, width: 25, height: 14 }}/>
            <EmailInput onChange={e => this.onChange(e, 'email')} style={styles.common.input} email={this.state.email} hidePlaceHolder={true}/>
          </Item>
          <Text style={styles.profile_initial.label}>
            <FormattedMessage id={'paypal_email'}/>
          </Text>
          <Item>
            <Image source={require('../../assets/images/icons/email.png')} style={{ marginTop: 5, width: 25, height: 14 }}/>
            <EmailInput
              onChange={e => this.onChange(e, 'paypalEmail')}
              style={styles.common.input}
              email={this.state.paypalEmail as string}
              hidePlaceHolder={true}
            />
          </Item>
          {this.state.errorMessage ? (
            <Text style={styles.common.email_pass_error}>
              <FormattedMessage id={this.state.errorMessage}/>
            </Text>
          ) : null}
          <Button transparent={true} style={styles.profile_initial.change_pass} onPress={this.onChangePress}>
            <Image source={require('../../assets/images/icons/Profile_change_password.png')}/>
            <Text style={styles.profile_initial.change_pass_text}>
              <FormattedMessage id={'profile_initial_change_pass'}/>
            </Text>
          </Button>
          <Button rounded={true} bordered={true} style={styles.profile_initial.save_button} onPress={this.onSubmitPress}>
            <Text style={styles.profile_initial.save_button_text}>
              <FormattedMessage id={'profile_initial_save'}/>
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ settings }: IReduxState) => {
  return {
    email: settings.user.email,
    paypalEmail: settings.user.paypalEmail
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IReduxState, void, Action>) => {
  return {
    setModalConfigs: (config: IModalConfigs) => dispatch(setModalConfigs(config)),
    getCurrentUser: () => dispatch(getCurrentUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInitial);