import { Icon, Input, Item } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { SafeAreaView, Text, View } from 'react-native';
import { Header, NextButton } from '../../components';
import styles from './styles';

class SignupEmailPassword extends PureComponent {
  public readonly state = {
    email: '',
    password: ''
  };

  private onChange = (val: string, key: string) => {
    this.setState({ [key]: val });
  };

  public render() {
    return (
      <View style={styles.common.container}>
        <Header/>
        <SafeAreaView>
          <View style={styles.email_pass.inner_container}>
            <Text style={styles.email_pass.title}>
              <FormattedMessage id={'signup_title'}/>
            </Text>
            <Item rounded={true} style={[styles.common.input_container, { marginTop: 32 }]}>
              <Icon type={'FontAwesome5'} name={'envelope'} style={styles.email_pass.icon}/>
              <Input
                placeholder={'Email Address'}
                style={styles.common.input}
                autoCapitalize={'none'}
                keyboardType={'email-address'}
                autoCorrect={false}
                autoCompleteType={'email'}
                onChangeText={e => this.onChange(e, 'email')}
                value={this.state.email}
              />
            </Item>
            <Item rounded={true} style={[styles.common.input_container, { marginTop: 40 }]}>
              <Icon type={'MaterialIcons'} name={'restore'} style={styles.email_pass.icon}/>
              <Input
                placeholder={'Temporary Password'}
                style={styles.common.input}
                autoCapitalize={'none'}
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={e => this.onChange(e, 'password')}
                value={this.state.password}
              />
            </Item>
            <NextButton/>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default SignupEmailPassword;