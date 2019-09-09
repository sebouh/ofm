import { Button } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Alert, AppState, AppStateStatus, Image, Linking, Platform, RefreshControl, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getOpenPositions } from '../../store/actions';
import { IReduxState } from '../../store/store';
import { globalStyles, IReferalPositions } from '../../utils';
import styles from './styles';

interface IProps {
  readonly positions: IReferalPositions[];
  readonly getOpenPositions: (callback?: () => void) => void;
}

class Refer extends PureComponent<IProps> {
  public readonly state = {
    openedPositions: new Set(),
    refreshing: false,
    appState: AppState.currentState
  };

  public componentDidMount(): void {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  public componentWillUnmount(): void {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  private handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.onRefresh();
    }

    this.setState({ appState: nextAppState });
  };

  private togglePosition = (id: number) => {
    const openedPositions = new Set(this.state.openedPositions);

    if (openedPositions.has(id)) {
      openedPositions.delete(id);
    } else {
      openedPositions.add(id);
    }

    this.setState({ openedPositions });
  };

  private onRefresh = () => {
    this.setState({ refreshing: true }, async () => {
      this.props.getOpenPositions(() => this.setState({ refreshing: false }));
    });
  };

  private onEmailPress = async (position: IReferalPositions) => {
    let url = 'mailto:';
    const text = this.generateText(position);

    url += `?body=${Platform.select({ ios: text, android: encodeURIComponent(text) })}&subject=Referral for a Job`;

    try {
      await Linking.openURL(url);
    } catch (e) {
      if (e.message === 'internet') {
        return Alert.alert('Please check internet connection and try again');
      }

      console.log(e);
    }
  };

  private onSmsPress = async (position: IReferalPositions) => {
    const sep = Platform.OS === 'ios' ? '&' : '?';
    const url = `sms:${''}${`${sep}body=${encodeURIComponent(this.generateText(position))}`}`;

    try {
      await Linking.openURL(url);
    } catch (e) {
      if (e.message === 'internet') {
        return Alert.alert('Please check internet connection and try again');
      }

      console.log(e);
    }
  };

  private generateText(position: IReferalPositions) {
    // tslint:disable-next-line:max-line-length
    return `Hello there! I would like to refer you for a position of a ${position.name} for the ${position.companyName} company. For more details, please follow the link attached ${position.url}`;
  }

  public render() {
    return (
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
            tintColor={globalStyles.colors.purple}
          />
        }
      >
        <View style={styles.refer.top_container}>
          <Text style={styles.refer.top_text}>
            <FormattedMessage id={'main_dashboard_refer_title_1'}/>
          </Text>
          <Text style={styles.refer.top_text}>
            <FormattedMessage id={'main_dashboard_refer_title_2'}/>
          </Text>
          <Text style={styles.refer.top_text}>
            <FormattedMessage id={'main_dashboard_refer_title_3'}/>
          </Text>
        </View>
        <View style={styles.refer.bottom_container}>
          {this.props.positions.map(position => {
            const isActive = this.state.openedPositions.has(position.id);

            return (
              <View key={position.id} style={styles.refer.item}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={styles.refer.item_text}>{position.name}</Text>
                  <Button transparent={true} onPress={() => this.togglePosition(position.id)} style={styles.refer.item_expand_button}>
                    {isActive ? (
                      <Image source={require('../../assets/images/icons/Arrow_opened.png')}/>
                    ) : (
                      <Image source={require('../../assets/images/icons/Arrow_closed.png')}/>
                    )}
                  </Button>
                </View>
                {isActive && (
                  <View style={styles.refer.additionalInfo}>
                    <Text style={styles.refer.positionUrl}>{position.url}</Text>
                    <View style={styles.refer.divider}/>
                    <Text style={styles.refer.inviteMethodTitle}>
                      <FormattedMessage id={'main_dashboard_refer_payment_method_title'}/>
                    </Text>
                    <View style={styles.refer.inviteButtonContainer}>
                      <Button transparent={true} style={styles.refer.inviteButton} onPress={() => this.onSmsPress(position)}>
                        <Text style={styles.refer.inviteButtonText}>
                          <FormattedMessage id={'main_dashboard_refer_payment_method_sms'}/>
                        </Text>
                      </Button>
                      <View style={styles.refer.buttonDivider}/>
                      <Button transparent={true} style={styles.refer.inviteButton} onPress={() => this.onEmailPress(position)}>
                        <Text style={styles.refer.inviteButtonText}>
                          <FormattedMessage id={'main_dashboard_refer_payment_method_email'}/>
                        </Text>
                      </Button>
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ data }: IReduxState) => {
  return {
    positions: data.positions
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IReduxState, void, Action>) => {
  return {
    getOpenPositions: (callback?: () => void) => dispatch(getOpenPositions(callback)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Refer);