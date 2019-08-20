import debounce from 'lodash/debounce';
import { Button } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Alert, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Header, RedeemSubHeader } from '../../components';
import { eventEmitter } from '../../services';
import { setModalConfigs } from '../../store/actions';
import { IReduxState } from '../../store/store';
import { axiosInstance, IModalConfigs, IRedeem } from '../../utils';
import { emitterEvents } from '../../utils/constants';
import styles from '../styles';

interface IProps {
  readonly redeem: IRedeem;
  readonly setModalConfigs: (config: IModalConfigs) => void;
}

class RedeemConfirmation extends PureComponent<IProps> {
  public componentDidMount(): void {
    eventEmitter.on(emitterEvents.on_redeem_modal_close, this.onModalClose);
  }

  public componentWillUnmount(): void {
    eventEmitter.removeEventListener(emitterEvents.on_redeem_modal_close, this.onModalClose);
  }

  private onModalClose = () => {
    setTimeout(() => Actions.pop(), 500);
  };

  private onRedeemPress = async () => {
    try {
      const { data } = await axiosInstance.post('/reward/open-positions', { amount: this.props.redeem.ptsAvailable });

      if (data.errors && data.errors.length) {
        return Alert.alert(data.errors[0]);
      }

      this.props.setModalConfigs({
        isVisible: true,
        title: 'modal_success_title',
        confirm: false,
        icon: 'redeem',
        message: 'redeem_finished_desc',
        event: emitterEvents.on_redeem_modal_close
      });
    } catch (err) {
      console.log(err);
      Alert.alert(err.response ? err.response.message : 'Something went wrong');
    }
  };

  private onButtonPress = debounce(this.onRedeemPress, 1000, { leading: true, trailing: false });

  public render() {
    const { redeem } = this.props;
    return (
      <View style={styles.redeem_initial.container}>
        <Header/>
        <RedeemSubHeader title={'redeem_confirmation_title'}/>
        <View style={{ flex: 1 }}>
          <View style={styles.redeem_initial.card}>
            <Text style={styles.redeem_initial.confirm_info_text}>
              <FormattedMessage id={'redeem_confirmation_info'} values={{ points: redeem.ptsAvailable, amount: `$${Math.round(redeem.ptsAvailable / 100)}` }}/>
            </Text>
            <Button
              onPress={this.onButtonPress}
              transparent={true}
              style={styles.redeem_initial.button}
            >
              <Text style={styles.redeem_initial.button_text}>
                <FormattedMessage id={'redeem_confirm_button'}/>
              </Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ data }: IReduxState) => {
  return {
    redeem: data.redeem
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setModalConfigs: (config: IModalConfigs) => dispatch(setModalConfigs(config))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RedeemConfirmation);