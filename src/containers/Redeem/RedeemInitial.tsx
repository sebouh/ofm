import { Button } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Header, RedeemSubHeader, TabBar } from '../../components';
import { getRedeemData } from '../../store/actions';
import { IReduxState } from '../../store/store';
import { IRedeem } from '../../utils';
import styles from '../styles';

interface IProps {
  readonly getRedeemData: () => void;
  readonly redeem: IRedeem;
}

class RedeemInitial extends PureComponent<IProps> {
  public componentDidMount(): void {
    this.props.getRedeemData();
  }

  public render() {
    const { redeem } = this.props;
    return (
      <View style={styles.redeem_initial.container}>
        <Header/>
        <RedeemSubHeader title={'redeem_title'}/>
        <View style={{ flex: 1 }}>
          {redeem && redeem.id ? (
            <View style={styles.redeem_initial.card}>
              <View style={styles.redeem_initial.row}>
                <Text style={styles.redeem_initial.text_big}>
                  <FormattedMessage id={'redeem_points'}/>
                </Text>
                <Text style={[styles.redeem_initial.text_big, styles.redeem_initial.text_big_bold]}>{redeem.ptsAvailable}</Text>
              </View>

              <View style={styles.redeem_initial.separator}/>

              <View style={[styles.redeem_initial.row, { marginTop: 25 }]}>
                <Text style={styles.redeem_initial.text_big}>
                  <FormattedMessage id={'redeem_currency'}/>
                </Text>
                <Text style={[styles.redeem_initial.text_big, styles.redeem_initial.text_big_bold]}>$ {Math.round(redeem.ptsAvailable / 100)}</Text>
              </View>

              <View style={styles.redeem_initial.separator}/>

              <View style={{ marginTop: 24 }}>
                <Text style={styles.redeem_initial.redeem_notice_one}>
                  <FormattedMessage id={'redeem_place'}/>
                </Text>
                <Text style={styles.redeem_initial.redeem_notice_two}>
                  <FormattedMessage id={'redeem_notice'}/>
                </Text>
              </View>
              <Button transparent={true} disabled={redeem.ptsAvailable / 100 < 10} style={styles.redeem_initial.button}>
                <Text style={styles.redeem_initial.button_text}>
                  <FormattedMessage id={'tab_bar_redeem'}/>
                </Text>
              </Button>
            </View>
          ) : null}
        </View>
        <TabBar active={2}/>
      </View>
    );
  }
}

const mapStateToProps = ({ data }: IReduxState) => {
  return {
    redeem: data.redeem
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IReduxState, void, Action>) => {
  return {
    getRedeemData: () => dispatch(getRedeemData())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RedeemInitial);