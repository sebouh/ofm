import debounce from 'lodash/debounce';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Linking, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Header, SubHeader } from '../components';
import { globalStyles } from '../utils';
import styles from './styles';

class PrivacyPolicy extends PureComponent {
  private onButtonPress = () => Linking.openURL('https://www.termsfeed.com/blog/gdpr/#Individual_Rights_Under_the_GDPR');
  private onGdprPress = debounce(this.onButtonPress, 1000, { leading: true, trailing: false });

  public render() {
    const textStyle = { ...globalStyles.fonts.regular, fontSize: 15, lineHeight: 22, letterSpacing: -0.36 };
    return (
      <View style={styles.redeem_initial.container}>
        <Header/>
        <SubHeader title={'menu_privacy'}/>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={[styles.feedback.container, { marginBottom: 20 }]}>
            <Text style={textStyle}>
              <FormattedMessage id={'privacy_policy_text'}/>
            </Text>
            <TouchableOpacity onPress={this.onGdprPress}>
              <Text style={[textStyle, { color: 'blue' }]}>
                <FormattedMessage id={'privacy_policy_text_link'}/>
              </Text>
            </TouchableOpacity>
            <Text style={textStyle}>
              <FormattedMessage id={'privacy_policy_text_second'}/>
            </Text>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

export default PrivacyPolicy;