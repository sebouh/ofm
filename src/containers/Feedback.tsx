import debounce from 'lodash/debounce';
import { Button } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Alert, SafeAreaView, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Header, SubHeader } from '../components';
import { eventEmitter } from '../services';
import { setModalConfigs } from '../store/actions';
import { axiosInstance, IModalConfigs } from '../utils';
import { emitterEvents } from '../utils/constants';
import styles from './styles';

interface IProps {
  readonly setModalConfigs: (config: IModalConfigs) => void;
}

class Feedback extends PureComponent<IProps> {
  public readonly state = {
    feedback: '',
    isLoading: false
  };

  public componentDidMount(): void {
    eventEmitter.on(emitterEvents.on_feedback_sent_modal_close, this.onModalClose);
  }

  public componentWillUnmount(): void {
    eventEmitter.removeEventListener(emitterEvents.on_feedback_sent_modal_close, this.onModalClose);
  }

  private onModalClose = () => {
    setTimeout(() => Actions.reset('main_dashboard'), 500);
  };

  private onSubmit = () => {
    this.setState({ isLoading: true }, async () => {
      try {
        await axiosInstance.post('/feedback', { text: this.state.feedback });

        this.props.setModalConfigs({
          isVisible: true,
          title: 'modal_success_title',
          confirm: false,
          icon: 'feedback',
          message: 'feedback_submit_success',
          event: emitterEvents.on_feedback_sent_modal_close
        });
      } catch (err) {

        if (err.message === 'internet') {
          return Alert.alert('Please check internet connection and try again');
        }

        let message = err && err.response && err.response.message ? err.response.message : 'Something went wrong';
        if (err && err.response && err.response.status === 401) {
          message = 'You don\'t have permissions to use this app';
        }

        Alert.alert(message);
      } finally {
        this.setState({ isLoading: false });
      }
    });
  };

  private onSubmitPress = debounce(this.onSubmit, 1000, { leading: true, trailing: false });

  public render() {
    const isDisabled = !this.state.feedback || this.state.isLoading;
    return (
      <View style={styles.redeem_initial.container}>
        <Header/>
        <SubHeader title={'feedback_title'}/>
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAwareScrollView style={styles.feedback.container} scrollEnabled={true}>
            <Text style={styles.feedback.description}>
              <FormattedMessage id={'feedback_message'}/>
            </Text>
            <FormattedMessage id={'feedback_placeholder'}>
              {placeholder => (
                <TextInput
                  placeholder={placeholder as string}
                  multiline={true}
                  value={this.state.feedback}
                  onChangeText={e => this.setState({ feedback: e })}
                  placeholderTextColor={'rgba(112, 112, 112, 0.58)'}
                  autoCorrect={false}
                  style={styles.feedback.input}
                  maxLength={2000}
                />
              )}
            </FormattedMessage>
            <Button
              rounded={true}
              bordered={true}
              style={[styles.profile_initial.save_button, styles.feedback.button, isDisabled && styles.feedback.button_disabled]}
              onPress={this.onSubmitPress}
              disabled={isDisabled}
            >
              <Text style={[styles.profile_initial.save_button_text, isDisabled && styles.feedback.button_disabled_text]}>
                <FormattedMessage id={'feedback_submit'}/>
              </Text>
            </Button>
            <View style={{ height: 40 }}/>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setModalConfigs: (config: IModalConfigs) => dispatch(setModalConfigs(config)),
  };
};

export default connect(null, mapDispatchToProps)(Feedback);