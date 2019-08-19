import { Button } from 'native-base';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Image, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { IReduxState } from '../../store/store';
import { IReferalPositions } from '../../utils';
import styles from './styles';

interface IProps {
  readonly positions: IReferalPositions[];
}

class Refer extends Component<IProps> {
  public readonly state = {
    openedPositions: new Set()
  };

  private togglePosition = (id: number) => {
    const { openedPositions } = { ...this.state };

    if (openedPositions.has(id)) {
      openedPositions.delete(id);
    } else {
      openedPositions.add(id);
    }

    this.setState({ openedPositions });
  };

  public render() {
    return (
      <ScrollView style={{ flex: 1 }}>
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
                  <Button transparent={true} onPress={() => this.togglePosition(position.id)} style={{ height: 'auto' }}>
                    <Image source={require('../../assets/images/icons/expand.png')}/>
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
                      <Button transparent={true} style={styles.refer.inviteButton}>
                        <Text style={styles.refer.inviteButtonText}>
                          <FormattedMessage id={'main_dashboard_refer_payment_method_sms'}/>
                        </Text>
                      </Button>
                      <View style={styles.refer.buttonDivider}/>
                      <Button transparent={true} style={styles.refer.inviteButton}>
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

export default connect(mapStateToProps)(Refer);