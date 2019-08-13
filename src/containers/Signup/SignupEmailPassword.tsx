import { Button, Icon, Input, Item } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { SafeAreaView, Text, View } from 'react-native';
import { Header } from '../../components';
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
              <FormattedMessage id={'signup_email'}>
                {placeholder => (
                  <Input
                    placeholder={placeholder as string}
                    style={styles.common.input}
                    autoCapitalize={'none'}
                    keyboardType={'email-address'}
                    autoCorrect={false}
                    autoCompleteType={'email'}
                    onChangeText={e => this.onChange(e, 'email')}
                    value={this.state.email}
                  />
                )}
              </FormattedMessage>
            </Item>
            <Item rounded={true} style={[styles.common.input_container, { marginTop: 40 }]}>
              <Icon type={'MaterialIcons'} name={'restore'} style={styles.email_pass.icon}/>
              <FormattedMessage id={'signup_password'}>
                {placeholder => (
                  <Input
                    placeholder={placeholder as string}
                    style={styles.common.input}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    secureTextEntry={true}
                    onChangeText={e => this.onChange(e, 'password')}
                    value={this.state.password}
                  />
                )}
              </FormattedMessage>
            </Item>
            <Button block={true} style={[styles.common.button, { marginTop: 64 }]}>
              <Text style={styles.common.button_text}><FormattedMessage id={'next_button'}/></Text>
            </Button>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default SignupEmailPassword;