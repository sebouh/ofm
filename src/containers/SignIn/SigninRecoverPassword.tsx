import debounce from 'lodash/debounce';
import { Item } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Image, SafeAreaView, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { EmailInput, Header, NextButton } from '../../components';
import { eventEmitter } from '../../services';
import { setModalConfigs } from '../../store/actions';
import { IModalConfigs, setRecoveryPass, validateEmail } from '../../utils';
import { emitterEvents } from '../../utils/constants';
import styles from '../styles';

interface IProps {
  readonly setModalConfigs: (config: IModalConfigs) => void;
}

class SigninRecoverPassword extends PureComponent<IProps> {
  public readonly state = {
    email: '',
    errorMessage: '',
    isLoading: false
  };

  public componentDidMount(): void {
    eventEmitter.on(emitterEvents.on_email_recover_modal_close, this.onModalClose);
  }

  public componentWillUnmount(): void {
    eventEmitter.removeEventListener(emitterEvents.on_email_recover_modal_close, this.onModalClose);
  }

  private onModalClose = () => {
    setTimeout(() => Actions.push('sign_in_confirm_code', { email: this.state.email }), 500);
  };

  private onSubmit = async () => {
    if (!validateEmail(this.state.email)) {
      return this.setState({ errorMessage: 'incorrect_email' });
    }

    this.setState({ isLoading: true }, async () => {
      try {
        await setRecoveryPass(this.state.email);

        this.props.setModalConfigs({
          isVisible: true,
          title: 'modal_success_title',
          confirm: false,
          icon: 'success',
          message: 'modal_email_desc',
          event: emitterEvents.on_email_recover_modal_close
        });
      } catch (e) {
        console.log(e);
        return this.setState({ errorMessage: 'signin_recovery_error' });
      } finally {
        this.setState({ isLoading: false });
      }
    });
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
            <NextButton
              disabled={this.state.isLoading}
              onPress={this.onNextPress}
              title={'submit_button'}
              buttonStyle={{ marginTop: !errorMessage ? 64 : 36 }}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setModalConfigs: (config: IModalConfigs) => dispatch(setModalConfigs(config))
  };
};

export default connect(null, mapDispatchToProps)(SigninRecoverPassword);