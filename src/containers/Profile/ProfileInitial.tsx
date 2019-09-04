import debounce from 'lodash/debounce';
import { Button, Item } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Alert, Image, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
  private emailRef: any;
  private paypalRef: any;

  public readonly state = {
    email: this.props.email,
    paypalEmail: this.props.paypalEmail,
    errorMessage: '',
    emailError: '',
    paypalError: ''
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
    this.setState({ [key]: val, errorMessage: '', emailError: '', paypalError: '' });
  };

  private onSubmit = async () => {
    const { email, paypalEmail } = this.state;
    const errors = {} as { [key: string]: string };

    if (!validateEmail(email)) {
      errors.emailError = 'incorrect_email';
    }

    if (!validateEmail(paypalEmail)) {
      errors.paypalError = 'incorrect_email';
    }

    if (Object.keys(errors).length) {
      return this.setState(errors);
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
      if (err.message === 'internet') {
        return Alert.alert('Please check internet connection and try again');
      }

      this.setState({ errorMessage: 'unhandled_error' });
    }
  };

  private onEditPress = (ref: any) => {
    if (ref && ref._root) {
      ref._root.focus();
    }
  };

  private onChangPassPress = () => {
    this.setState({
      email: this.props.email, paypalEmail: this.props.paypalEmail,
      errorMessage: '',
      emailError: '',
      paypalError: ''
    });

    return Actions.push('profile_change_pass');
  };

  private onChangePress = debounce(this.onChangPassPress, 1000, { leading: true, trailing: false });

  private onSubmitPress = debounce(this.onSubmit, 1000, { leading: true, trailing: false });

  public render() {
    return (
      <View style={styles.redeem_initial.container}>
        <Header/>
        <SubHeader title={'profile_title'}/>
        <KeyboardAwareScrollView style={styles.profile_initial.container}>
          <Text style={styles.profile_initial.label}>
            <FormattedMessage id={'email'}/>
          </Text>
          <Item>
            <Image source={require('../../assets/images/icons/email.png')} style={{ marginTop: 5, width: 25, height: 14 }}/>
            <EmailInput
              getRef={(ref: any) => this.emailRef = ref}
              onChange={e => this.onChange(e, 'email')}
              style={styles.common.input}
              email={this.state.email}
              hidePlaceHolder={true}
            />
            <Button transparent={true} style={{ height: 'auto' }} onPress={() => this.onEditPress(this.emailRef)}>
              <Image source={require('../../assets/images/icons/Edit.png')}/>
            </Button>
          </Item>
          {this.state.emailError ? (
            <Text style={styles.common.email_pass_error}>
              <FormattedMessage id={this.state.emailError}/>
            </Text>
          ) : null}
          <Text style={styles.profile_initial.label}>
            <FormattedMessage id={'paypal_email'}/>
          </Text>
          <Item>
            <Image source={require('../../assets/images/icons/email.png')} style={{ marginTop: 5, width: 25, height: 14 }}/>
            <EmailInput
              getRef={(ref: any) => this.paypalRef = ref}
              onChange={e => this.onChange(e, 'paypalEmail')}
              style={styles.common.input}
              email={this.state.paypalEmail as string}
              hidePlaceHolder={true}
            />
            <Button transparent={true} style={{ height: 'auto' }} onPress={() => this.onEditPress(this.paypalRef)}>
              <Image source={require('../../assets/images/icons/Edit.png')}/>
            </Button>
          </Item>
          {this.state.paypalError ? (
            <Text style={styles.common.email_pass_error}>
              <FormattedMessage id={this.state.paypalError}/>
            </Text>
          ) : null}
          <Button transparent={true} style={styles.profile_initial.change_pass} onPress={this.onChangePress}>
            <Image source={require('../../assets/images/icons/Profile_change_password.png')}/>
            <Text style={styles.profile_initial.change_pass_text}>
              <FormattedMessage id={'profile_initial_change_pass'}/>
            </Text>
          </Button>
          {this.state.errorMessage ? (
            <Text style={styles.common.email_pass_error}>
              <FormattedMessage id={this.state.errorMessage}/>
            </Text>
          ) : null}
          <Button rounded={true} bordered={true} style={styles.profile_initial.save_button} onPress={this.onSubmitPress}>
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