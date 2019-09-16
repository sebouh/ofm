import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Header, SubHeader } from '../components';
import { globalStyles } from '../utils';
import styles from './styles';

class PrivacyPolicy extends PureComponent {
  public render() {
    return (
      <View style={styles.redeem_initial.container}>
        <Header/>
        <SubHeader title={'menu_privacy'}/>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={[styles.feedback.container, { marginBottom: 20 }]}>
            <Text style={{ ...globalStyles.fonts.regular, fontSize: 15, lineHeight: 22, letterSpacing: -0.36 }}>
              <FormattedMessage id={'privacy_policy_text'}/>
            </Text>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

export default PrivacyPolicy;