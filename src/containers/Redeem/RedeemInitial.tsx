import debounce from 'lodash/debounce';
import { Button } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Header, LoaderIndicator, SubHeader, TabBar } from '../../components';
import { getRedeemData } from '../../store/actions';
import { IReduxState } from '../../store/store';
import { globalStyles, IRedeem } from '../../utils';
import styles from '../styles';

interface IProps {
  readonly getRedeemData: (callback?: () => void) => void;
  readonly redeem: IRedeem;
}

class RedeemInitial extends PureComponent<IProps> {
  public readonly state = {
    refreshing: false
  };

  public componentDidMount(): void {
    this.props.getRedeemData();
  }

  private onRefresh = () => {
    this.setState({ refreshing: true }, () => {
      this.props.getRedeemData(() => this.setState({ refreshing: false }));
    });
  };

  private onRedeemPress = () => Actions.push('redeem_confirmation');

  private onNextPress = debounce(this.onRedeemPress, 1000, { leading: true, trailing: false });

  public render() {
    const { redeem } = this.props;
    const amount = redeem && redeem.id ? redeem.ptsAvailable * redeem.rate : 0;

    return (
      <View style={styles.redeem_initial.container}>
        <Header replace={'main_dashboard'}/>
        <SubHeader title={'redeem_title'}/>
        {redeem && redeem.id ? (
          <ScrollView style={{ flex: 1 }}>
            <RefreshControl refreshing={this.state.refreshing} tintColor={globalStyles.colors.purple} onRefresh={this.onRefresh}/>
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
                <Text style={[styles.redeem_initial.text_big, styles.redeem_initial.text_big_bold]}>$ {amount}</Text>
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
              <Button
                onPress={this.onNextPress}
                transparent={true}
                disabled={amount < 10}
                style={styles.redeem_initial.button}
              >
                <Text style={[styles.redeem_initial.button_text, amount < 10 && styles.redeem_initial.button_text_disabled]}>
                  <FormattedMessage id={'tab_bar_redeem'}/>
                </Text>
              </Button>
            </View>
          </ScrollView>
        ) : <LoaderIndicator/>}
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
    getRedeemData: (callback?: () => void) => dispatch(getRedeemData(callback))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RedeemInitial);