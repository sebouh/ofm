import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Header, RedeemSubHeader } from '../../components';
import { IReduxState } from '../../store/store';
import { IRedeem } from '../../utils';
import styles from '../styles';
import { Button } from 'native-base';

interface IProps {
  readonly redeem: IRedeem;
}

class RedeemConfirmation extends PureComponent<IProps> {
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

export default connect(mapStateToProps)(RedeemConfirmation);